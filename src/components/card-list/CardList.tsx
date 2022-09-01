import React, {FC} from 'react';
import Card from '../card/Card';
import {Product} from "../../entities/product.entity";
import classes from "./CardList.module.css";
import {Transition, TransitionGroup} from 'react-transition-group'

interface CardListProps{
    products: Product[]
}

const CardList:FC<CardListProps> = ({products}) => {
    if (products.length == 0) {
        return (
            <div>
                <h2>Sorry, we don't have this product yet</h2>
            </div>
        )
    } else
    return (
        <div className={classes.cardList}>
            {products.map((product)=>
                    <Card
                        key={product.id}
                        item={product}/>
            )}
        </div>
    );
};
export default CardList;