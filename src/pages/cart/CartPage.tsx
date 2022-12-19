import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import classes from "./CartPage.module.css";
import CartCardList from "../../components/cart-lists/cart-card-list/CartCardList";
import CartShortList from "../../components/cart-lists/cart-short-list/CartShortList";
import AddButton from "../../components/UI/add-button/AddButton";
import { useActions } from "../../hooks/useActions";

const CartPage = () => {
  const cart = useTypedSelector((state) => state.cart);
  const { removeItem } = useActions();

  return (
    <div className={classes.cart}>
      {cart.items.length === 0 ? (
        <div className={classes.cart__empty}>
          <h2>Your cart is empty</h2>
        </div>
      ) : (
        <div className={classes.cart__not_empty}>
          <div className={classes.cart_items}>
            <CartCardList cart={cart} remove={removeItem} />
          </div>
          <div className={classes.cart_list}>
            <h2>Items: </h2>
            <CartShortList cart={cart} remove={removeItem} />
            <div className={classes.cart_list__total_price}>
              <h3>Total: </h3>
              <h3>
                {"$" +
                  cart.items
                    .map((item) => item.product.price)
                    .reduce(
                      (sum, price) => sum + parseFloat(price.split("$")[1]),
                      0
                    )
                    .toFixed(2)}
              </h3>
            </div>
            <div className={classes.cart_list__purchase_button}>
              <AddButton>Purchase</AddButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
