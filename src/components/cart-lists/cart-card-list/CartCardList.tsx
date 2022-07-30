import React, {FC} from 'react';
import classes from "./CartCardList.module.css";
import CartCard from "../../cart-card/CartCard";
import {CartState} from "../../../store/reducers/cartRedusers";

interface CartCardListProps{
    cart: CartState
}

const CartCardList:FC<CartCardListProps> = ({cart}) => {
    return (
        <div className={classes.cart_card_list}>
            {cart.items.map((item)=>
                <div
                    className={classes.cart_card_list__card}
                    key={item.id}
                >
                    <CartCard item={item}/>
                </div>
            )}
        </div>
    );
};

export default CartCardList;