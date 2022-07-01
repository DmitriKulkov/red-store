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
import {Clear} from "@mui/icons-material"
import {getPagesCount} from "../../components/utils/pages";
import {useObserver} from "../../hooks/useObserver";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../../components/UI/loader/Loader";


const SearchPage:FC = () => {
    const limit = 2

    const {filters} = useTypedSelector(filters => filters)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [items, setItems] = useState<Product[]>([])

    const [colors, setColors] = useState<Color[]>([])
    const [collections, setCollections] = useState<Collection[]>([])

    const {changePriceDiapason, changeSortPrice, changeColors, changeCollection, removeFilters} = useActions()

    const lastElement = useRef() as React.MutableRefObject<HTMLDivElement>;

    const debouncedPriceA = useDebouncedCallback(<T extends Function>(callback:T)=>{callback()}, 1000)
    const debouncedPriceB = useDebouncedCallback(<T extends Function>(callback:T)=>{callback()}, 1000)

    const {fetching: fetchItems, isLoading: isItemsLoading, error: itemsError} = useFetching(async (limit: number, page: number, reset:boolean = false) => {
        const response = await ItemsService.getAllItems(limit, page, filters)
        const totalCount = parseInt(response.headers['x-total-count'])
        if(reset) {
            setPage(0)
            setItems([...response.data])
        }else {
            setItems([...items, ...response.data])
            setTotalPages(getPagesCount(totalCount, limit))
        }
    })


    const fetchProperties = async () => {
        const col = await ColorsService.getAll()
        setColors(col.data)
        const collect = await  CollectionsService.getAll()
        setCollections(collect.data)
    }

    useEffect(()=>{
        fetchProperties()
    },[])

    useEffect(()=>{
        fetchItems(limit, page)
    }, [page])

    useEffect(()=>{
        fetchItems(limit, page, true)
    },[filters])

    useObserver(lastElement, page < totalPages, isItemsLoading,()=>{
        setPage(page+1)
    })

    return (
        <div className={classes.search}>
            <div>
                <div className={classes.search__headbar}>
                    <div className={classes.filters__label_container}>
                        <label className={classes.filters__label}>{(filters.name == undefined || filters.name == "")?"Filters":"Search: " + filters.name}</label>
                        <IconButton
                            aria-label="delete"
                            onClick={()=>{
                                removeFilters()
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
                                    className={classes.filters__price_interval_input}
                                    type="text"
                                    value={filters.priceDiapason.a}
                                    onChange={(e)=> {
                                        debouncedPriceA(()=> {
                                            changePriceDiapason({
                                                a: isNaN(parseInt(e.target.value, 10)) ? filters.priceDiapason.a : parseInt(e.target.value, 10),
                                                b: filters.priceDiapason.b
                                            })
                                        })
                                    }}
                                />
                                <p>to: </p>
                                <input
                                    className={classes.filters__price_interval_input}
                                    type="text"
                                    value={filters.priceDiapason.b}
                                    onChange={(e)=> {
                                        debouncedPriceB(()=>{
                                            changePriceDiapason({
                                              a: filters.priceDiapason.a,
                                              b: isNaN(parseInt(e.target.value, 10))?filters.priceDiapason.b : parseInt(e.target.value, 10)
                                            })
                                        })
                                    }}
                                />
                            </div>
                        </Dropdown>
                        <Dropdown header="Category">
                            <div>For Men</div>
                            <div>For Women</div>
                        </Dropdown>
                        <Dropdown header="Color">
                            <div >
                                <p>Colors:</p>
                                <ColorList
                                    colors={colors}
                                    onClick={(color)=> {
                                        changeColors(color)
                                        console.log(filters.cColors)
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
                :null
            }
            <div ref={lastElement} className={classes.loader}/>
        </div>
    );
};

export default SearchPage;