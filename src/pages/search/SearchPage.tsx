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


const SearchPage:FC = () => {
    const limit = 8

    const filters = useTypedSelector(state => state.filters)
    const title = useTypedSelector(state => state.title)
    const [page, setPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [items, setItems] = useState<Product[]>([])
    const [diapason, setDiapason] = useState<{a:string, b:string}>({a:'0', b:'10000'})

    const [colors, setColors] = useState<Color[]>([])
    const [collections, setCollections] = useState<Collection[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    const {changePriceDiapason, changeSortPrice, changeColors, changeCollection, changeCategory, removeFilters, changeTitle, resetTitle} = useActions()

    const lastElement = useRef() as React.MutableRefObject<HTMLDivElement>;

    const debouncedPriceA = useDebouncedCallback(<T extends Function>(callback:T)=>{callback()}, 1000)
    const debouncedPriceB = useDebouncedCallback(<T extends Function>(callback:T)=>{callback()}, 1000)

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
                    <div className={classes.filters__menu}>
                        <IconButton
                            aria-label="filters"
                        >
                            <KeyboardArrowDown sx={{fontSize: "40px", color: "#686868"}}/>
                        </IconButton>
                    </div>
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
                            <p>Sort by:</p>
                            <div className={classes.checkbox_container}>
                                <Checkbox
                                    checked={filters.sortPrice === 1}
                                    onClick={
                                        () => {
                                            changeSortPrice(1)
                                        }
                                    }
                                />
                                price increase
                            </div>
                            <div className={classes.checkbox_container}>
                                <Checkbox
                                    checked={filters.sortPrice === -1}
                                    onClick={
                                        ()=> {
                                            changeSortPrice(-1)
                                        }
                                    }
                                />
                                price decrease
                            </div>
                            <p>Price interval:</p>
                            <div className={classes.filters__price_interval}>
                                <p>from: </p>
                                <input
                                    value={diapason.a}
                                    className={classes.filters__price_interval_input}
                                    type="text"
                                    onChange={(e)=> {
                                        debouncedPriceA(()=> {
                                            changePriceDiapason({
                                                a: isNaN(parseInt(e.target.value, 10)) ? filters.priceDiapason.a : parseInt(e.target.value, 10),
                                                b: filters.priceDiapason.b
                                            })
                                        })
                                        setDiapason({
                                            a: e.target.value,
                                            b: diapason.b
                                        })
                                    }}
                                />
                                <p>to: </p>
                                <input
                                    value={diapason.b}
                                    className={classes.filters__price_interval_input}
                                    type="text"
                                    onChange={(e)=> {
                                        debouncedPriceB(()=>{
                                            changePriceDiapason({
                                                a: filters.priceDiapason.a,
                                                b: isNaN(parseInt(e.target.value, 10))?filters.priceDiapason.b : parseInt(e.target.value, 10)
                                            })
                                        })
                                        setDiapason({
                                            a: diapason.a,
                                            b: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </Dropdown>
                        <Dropdown header="Category">
                            {categories.map(cat =>
                                <div
                                    key={cat.id}
                                    onClick={()=> {
                                        changeCategory(cat.name)
                                        changeTitle("Category: " + cat.name)
                                    }
                                }
                                >
                                    {cat.name}
                                </div>)}
                        </Dropdown>
                        <Dropdown header="Color">
                            <div >
                                <p>Colors:</p>
                                <ColorList
                                    colors={colors}
                                    selected={filters.cColors}
                                    onClick={(color)=> {
                                        changeColors(color as string)
                                    }}/>
                            </div>
                        </Dropdown>
                        <Dropdown header="Collection">
                            <div>
                                {
                                    collections.map(col=>
                                        <div key={col.id}
                                             style={{cursor: "pointer"}}
                                             onClick={()=>{
                                                 changeCollection(col.slug)
                                                 changeTitle(col.name)
                                             }}
                                        >
                                            {col.name}
                                        </div>
                                    )
                                }
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className={classes.collection}>
                <CardList products={items}/>
            </div>
            {isItemsLoading
                ?<div>
                    <Loader/>
                </div>
                :<div ref={lastElement} className={classes.loader}/>
            }

        </div>
    );
};

export default SearchPage;