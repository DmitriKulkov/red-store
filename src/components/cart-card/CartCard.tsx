import React, {FC} from 'react';
import {CartItem} from "../../entities/cart-item.entity";
import ColorList from "../color-list/ColorList";
import classes from "./CartCard.module.css"


interface CartCardProps{
    item: CartItem
}

const CartCard:FC<CartCardProps> = ({item}) => {
    return (
        <div className={classes.cart_card}>
            <img src={item.product.files[0].encoded_img} alt="item"/>
            <div className={classes.cart_card__info}>
                <h2>{item.product.model.name}</h2>
                <div className={classes.cart_card__attributes}>
                    <p>Color:</p>
                    <ColorList colors={[item.color]} selected={[]} onClick={()=>{}}/>
                    <p>{item.color.name}</p>
                </div>
                <div className={classes.cart_card__attributes}>
                    <p>Size:</p>
                    <p>{item.size}</p>
                </div>
                <p className={classes.cart_card__price}>{item.product.price}</p>
            </div>
        </div>
    );
};

export default CartCard;