import React, {FC, useEffect, useRef, useState} from 'react';
import classes from './SearchPage.module.css'
import Dropdown from "../../components/dropdown/Dropdown";
import CardList from "../../components/card-list/CardList";
import {Product} from "../../entities/product.entity";
import ItemsService from "../../API/ItemsService";
import ColorsService from "../../API/ColorsService";
import {Color} from "../../entities/color.entity";
import {Collection} from "../../entities/collection.entity";
import {CollectionsService} from "../../API/CollectionsService";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IconButton} from "@mui/material";
import {useActions} from "../../hooks/useActions";
import {Clear} from "@mui/icons-material"
import {getPagesCount} from "../../components/utils/pages";
import {useObserver} from "../../hooks/useObserver";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../../components/UI/loader/Loader";
import {Category} from "../../entities/category.entity";
import {CategoryService} from "../../API/CategoryService";
import PriceFilter from "./filters/price-filter/PriceFilter";
import CategoryFilter from "./filters/category-filter/CategoryFilter";
import ColorFilter from "./filters/color-filter/ColorFilter";
import CollectionFilter from "./filters/collection-filter/CollectionFilter";
import FilterDropdown from "../../components/filters-dropdown/FilterDropdown";
import FilterTab from "../../components/tab/Tab";


const SearchPage:FC = () => {
    const limit = 1

    const filters = useTypedSelector(state => state.filters)
    const title = useTypedSelector(state => state.title)
    const [page, setPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [items, setItems] = useState<Product[]>([])

    const [colors, setColors] = useState<Color[]>([])
    const [collections, setCollections] = useState<Collection[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    const {removeFilters, resetTitle} = useActions()

    const lastElement = useRef() as React.MutableRefObject<HTMLDivElement>;



    const {fetching: fetchItems, isLoading: isItemsLoading, error: itemsError} = useFetching(async (_limit: number, _page: number, _items: Product[]) => {
        setPage(_page)
        const res = await ItemsService.getAllItems(_limit, _page, filters)
        if(_page === 0) {
            setItems(res.data)
        }else{
            setItems(prev => [...prev, ...res.data])
        }
        const totalCount = parseInt(res.headers['x-total-count']) - 1
        setTotalPages(getPagesCount(totalCount, _limit))
    })

    const fetchCategories = async () => {
        const res = await CategoryService.getByGCategory(filters.globCat)
        setCategories(res.data)
    }

    useObserver(
        lastElement,
        (page < totalPages)&&(items.length > 0),
        isItemsLoading,
        () => fetchItems(limit, page + 1, items)
        )

    const fetchProperties = async () => {
        const col = await ColorsService.getAll()
        setColors(col.data)
        const collect = await CollectionsService.getAll()
        setCollections(collect.data)
    }

    useEffect(()=>{
        fetchProperties()
    },[])

    useEffect(()=>{
        fetchItems(limit, 0)
        fetchCategories()
    },[filters])

    return (
        <div className={classes.search}>
            <div>
                <div className={classes.search__headbar}>
                    <FilterDropdown className={classes.filters__menu}>
                        <FilterTab header="Cost">
                            <PriceFilter/>
                        </FilterTab>
                        <FilterTab header="Category">
                            <CategoryFilter categories={categories}/>
                        </FilterTab>
                        <FilterTab header="Color">
                            <ColorFilter colors={colors} cColors={filters.cColors}/>
                        </FilterTab>
                        <FilterTab header="Collection">
                            <CollectionFilter collections={collections}/>
                        </FilterTab>
                    </FilterDropdown>
                    <div className={classes.filters__label_container}>
                        <label className={classes.filters__label}>{title.title}</label>
                        <IconButton
                            aria-label="delete"
                            onClick={()=>{
                                removeFilters()
                                resetTitle()
                            }}>
                            <Clear />
                        </IconButton>
                    </div>
                    <div className={classes.filters}>
                        <Dropdown header="Cost">
                            <PriceFilter/>
                        </Dropdown>
                        <Dropdown header="Category">
                            <CategoryFilter categories={categories}/>
                        </Dropdown>
                        <Dropdown header="Color">
                            <ColorFilter colors={colors} cColors={filters.cColors}/>
                        </Dropdown>
                        <Dropdown header="Collection">
                            <CollectionFilter collections={collections}/>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className={classes.collection}>
                <CardList products={items}/>
            </div>
            {isItemsLoading
                ? <div className={classes.loader}>
                    <Loader/>
                </div>
                : null
            }
            <div ref={lastElement} className={classes.loader}/>
        </div>
    );
};

export default SearchPage;