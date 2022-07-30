import React, {FC} from 'react';
import {CartState} from "../../../store/reducers/cartRedusers";
import  classes from "./CartShortList.module.css"

interface CartShortListProps{
    cart: CartState
}

const CartShortList: FC<CartShortListProps> = ({cart}) => {
    return (
        <div className={classes.cart_short_list}>
            {cart.items.map((item)=>
                <div className={classes.cart_short_list__card} key={item.id}>
                    <p>{item.product.model.name}</p>
                    <p className={classes.cart_short_list__card__price}>{item.product.price}</p>
                </div>
            )}
        </div>
    );
};

export default CartShortList;