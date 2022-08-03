import React, {FC, useEffect, useState} from 'react'
import classes from './Home.module.css'
import CardList from "../../components/card-list/CardList";
import ItemsService from "../../API/ItemsService";
import {Product} from "../../entities/product.entity";



const Home:FC = () => {
    const limit = 8
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(0)
    const [items, setItems] = useState<Product[]>([])


    const fetchItems = async (limit: number, page: number) => {
        const response = await ItemsService.getItemsByCollection('summer-collection', limit, page).then()
        setItems([...items, ...response.data])
    }

    useEffect(()=>{
        fetchItems(limit, page)
    },[ ])

    return (
        <div className={classes.home}>
            <div className={classes.background}>
                <div className={classes.title_block}>
                    <h1 className={classes.title}>Welcome new collection</h1>
                    <h2 className={classes.description}>
                        Collection description, collection description. Collection <br/>
                        description, collection <br/>
                        description.Collection description, <br/>
                        collection description.Collection description, <br/>
                        collection description. <br/>
                    </h2>
                </div>
            </div>
            <div className={classes.collection}>
                <h1 className={classes.collection__title}>
                    Summer collection
                </h1>
                <CardList products={items}/>
            </div>
        </div>
    )
}
export default Home;