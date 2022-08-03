import React from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import classes from "./CartPage.module.css"
import CartCard from "../../components/cart-card/CartCard";
import CartCardList from "../../components/cart-lists/cart-card-list/CartCardList";
import CartShortList from "../../components/cart-lists/cart-short-list/CartShortList";
import AddButton from "../../components/add-button/AddButton";

const CartPage = () => {
    const cart = useTypedSelector(state=>state.cart)

    return (
        <div className={classes.cart}>
            {
                cart.items.length === 0?
                    <div className={classes.cart__empty}>
                        <h2>
                            Your cart is empty
                        </h2>
                    </div>
                    :<div className={classes.cart__not_empty}>
                        <div className={classes.cart_items}>
                            <CartCardList cart={cart}/>
                        </div>
                        <div className={classes.cart_list}>
                            <h2>Items: </h2>
                            <CartShortList cart={cart}/>
                            <div className={classes.cart_list__total_price}>
                                <h2>Total: </h2>
                                <h3>
                                    {
                                        '$' + cart.items
                                            .map((item)=>item.product.price)
                                            .reduce(
                                                (sum, price)=>
                                                    sum + parseFloat(price.split('$')[1]), 0
                                            ).toFixed(2)
                                    }
                                </h3>
                            </div>
                            <div className={classes.cart_list__purchase_button}>
                                <AddButton>Purchase</AddButton>
                            </div>
                        </div>
                    </div>
            }
        </div>


    );
};

export default CartPage;