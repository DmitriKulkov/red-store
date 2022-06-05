import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Product} from "../../entities/product.entity";
import classes from "./Card.module.css";


interface CardProps{
    item: Product;
}

const Card:FC<CardProps> = ({ item}) => {
    return (
        <div className={classes.card}>
            <Link to={'/product/' + item.model.slug} className={classes.link}>
                <div>
                    <img src={item.files[0].encoded_img} alt="item"/>
                </div>
                <div>
                    <h1>{item.model.name}</h1>
                    <h1>{item.price}</h1>
                </div>
            </Link>
        </div>
    );
};

export default Card;