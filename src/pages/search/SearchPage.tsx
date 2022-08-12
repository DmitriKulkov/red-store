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
import ColorList from "../../components/color-list/ColorList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDebouncedCallback} from "use-debounce";
import {Checkbox, IconButton} from "@mui/material";
import {useActions} from "../../hooks/useActions";
import {Clear, KeyboardArrowDown} from "@mui/icons-material"
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
import InformationBar from "../../components/information-bar/InformationBar";


const SearchPage:FC = () => {
    const limit = 8

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



    const {fetching: fetchItems, isLoading: isItemsLoading, error: itemsError} = useFetching(async (limit: number, page: number) => {
        const response = await ItemsService.getAllItems(limit, page, filters)
        const totalCount = parseInt(response.headers['x-total-count']) - 1
        if(page === 0) {
            setItems(response.data)
        }else{
            setItems([...items, ...response.data])
        }
        setTotalPages(getPagesCount(totalCount, limit))
    })


    const fetchProperties = async () => {
        const col = await ColorsService.getAll()
        setColors(col.data)
        const collect = await CollectionsService.getAll()
        setCollections(collect.data)
        const cats = await CategoryService.getAll()
        setCategories(cats.data)
    }

    useEffect(()=>{
        fetchProperties()
    },[])

    useEffect(()=>{
        setPage(0)
        fetchItems(limit, 0)
    },[filters])

    useObserver(lastElement, page < totalPages, isItemsLoading,()=>{
        setPage(page + 1)
        fetchItems(limit, page + 1)
    })

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
                ?<div className={classes.loader}>
                    <Loader/>
                </div>
                :<div ref={lastElement} className={classes.loader}/>
            }
            {/*<InformationBar/>*/}
        </div>
    );
};

export default SearchPage;