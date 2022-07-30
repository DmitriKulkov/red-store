import React, {FC} from 'react';
import Card from '../card/Card';
import {Product} from "../../entities/product.entity";
import classes from "./CardList.module.css";
import {Transition, TransitionGroup} from 'react-transition-group'

interface CardListProps{
    products: Product[]
}

const CardList:FC<CardListProps> = ({products}, ) => {
    return (
        <TransitionGroup className={classes.cardList}>
            {products.map((product)=>
                <Transition
                    key={product.id}
                    timeout={500}
                >
                    <Card item={product}/>
                </Transition>
            )}
        </TransitionGroup>
    );
};
export default CardList;