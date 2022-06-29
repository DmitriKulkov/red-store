import React, {FC, useEffect, useState} from 'react';
import classes from './SearchPage.module.css'
import Search from "../../components/search-bar/Search";
import Dropdown from "../../components/dropdown/Dropdown";
import CardList from "../../components/card-list/CardList";
import {Product} from "../../entities/product.entity";
import ItemsService from "../../API/ItemsService";
import Select from "../../components/select/Select";
import ColorsService from "../../API/ColorsService";
import {Color} from "../../entities/color.entity";
import {Collection} from "../../entities/collection.entity";
import {CollectionsService} from "../../API/CollectionsService";
import ColorList from "../../components/color-list/ColorList";
import {useDispatch, useSelector} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {
    changeCollection,
    changeColors,
    changePriceDiapason,
    changeSortPrice
} from "../../filters/action-creators/filters";
import {useDebouncedCallback} from "use-debounce";
import {Checkbox} from "@mui/material";

const SearchPage:FC = () => {
    const limit = 8

    const {filters} = useTypedSelector(filters => filters)
    const [search, setSearch] = useState<string>('')
    // const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(0)
    const [items, setItems] = useState<Product[]>([])
    const [inputDiapason, setInputDiapason] = useState<{a:string, b:string}>({a:"0", b:"0"})
    const [selectSort, setSelectSort] = useState<1|-1>(1)
    const dispatch = useDispatch()

    const [colors, setColors] = useState<Color[]>([])
    const [collections, setCollections] = useState<Collection[]>([])

    const debouncedPriceA = useDebouncedCallback(<T extends Function>(callback:T)=>{callback()}, 1000)
    const debouncedPriceB = useDebouncedCallback(<T extends Function>(callback:T)=>{callback()}, 1000)

    const fetchItems = async (limit: number, page: number, reset:boolean = false) => {
        const response = await ItemsService.getAllItems(limit, page, filters)
        if(reset) {
            setPage(0)
            setItems([...response.data])
        }else {
            setItems([...items, ...response.data])
        }
    }

    const fetchProperties = async () => {
        const col = await ColorsService.getAll()
        setColors(col.data)
        const collect = await  CollectionsService.getAll()
        setCollections(collect.data)
    }

    useEffect(()=>{
        fetchItems(limit, page)
        fetchProperties()
    },[])

    return (
        <div className={classes.search}>
            <div>
                <div className={classes.search__headbar}>
                    <div className={classes.search__bar}>
                        <Search value={search} onChange={(value:string)=>setSearch(value)}/>
                    </div>
                    <div className={classes.filters}>
                        <Dropdown header="Cost">
                            <p>Sort by:</p>
                            <div className={classes.checkbox_container}>
                                <Checkbox
                                    checked={selectSort === 1}
                                    onClick={
                                        () => {
                                            changeSortPrice(1)(dispatch)
                                            setSelectSort(1)
                                            fetchItems(limit, page, true)
                                        }
                                    }
                                />
                                price increase
                            </div>
                            <div className={classes.checkbox_container}>
                                <Checkbox
                                    checked={selectSort === -1}
                                    onClick={
                                        ()=> {
                                                changeSortPrice(-1)(dispatch)
                                                setSelectSort(-1)
                                                fetchItems(limit, page, true)
                                        }
                                    }
                                />
                                price decrease
                            </div>
                            {/*        <Select*/}
                            {/*            value={selectSort}*/}
                            {/*            defaultValue="Select Price Sort"*/}
                            {/*            onChange={(sortPrice)=> {*/}
                            {/*                changeSortPrice(sortPrice)(dispatch)*/}
                            {/*                setSelectSort(sortPrice)*/}
                            {/*                fetchItems(limit, page, true)*/}
                            {/*                console.log(filters.sortPrice)*/}
                            {/*                console.log(sortPrice)*/}
                            {/*            }}*/}
                            {/*            options={[*/}
                            {/*            {value: 1, name: "price increase"},*/}
                            {/*                {value: -1, name: "price decrease"},*/}
                            {/*            ]}*/}
                            {/*        />*/}
                            <p>Price interval:</p>
                            <div className={classes.filters__price_interval}>
                                <p>from: </p>
                                <input
                                    className={classes.filters__price_interval_input}
                                    type="text"
                                    value={inputDiapason.a}
                                    onChange={(e)=> {
                                        setInputDiapason({...inputDiapason, a: e.target.value})
                                        debouncedPriceA(()=> {
                                            changePriceDiapason({
                                                a: isNaN(parseInt(e.target.value, 10)) ? filters.priceDiapason.a : parseInt(e.target.value, 10),
                                                b: filters.priceDiapason.b
                                            })(dispatch)
                                            fetchItems(limit, page, true)
                                        })
                                    }}
                                />
                                <p>to: </p>
                                <input
                                    className={classes.filters__price_interval_input}
                                    type="text"
                                    value={inputDiapason.b}
                                    onChange={(e)=> {
                                        setInputDiapason({...inputDiapason, b: e.target.value})
                                        debouncedPriceB(()=>{
                                            changePriceDiapason({
                                              a: filters.priceDiapason.a,
                                              b: isNaN(parseInt(e.target.value, 10))?filters.priceDiapason.b:parseInt(e.target.value, 10)
                                            })(dispatch)
                                            fetchItems(limit, page, true)
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
                                        changeColors(color)(dispatch)
                                        fetchItems(limit, page, true)
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
                                                 changeCollection(col.slug)(dispatch)
                                                 fetchItems(limit, page, true)
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
        </div>
    );
};

export default SearchPage;