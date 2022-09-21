import { CartItem } from "../../entities/cart-item.entity";
import { Dispatch } from "redux";
import { itemsActionType, SetItemsAction } from "../reducers/cartRedusers";
import { Product } from "../../entities/product.entity";
import { Color } from "../../entities/color.entity";
import { Sizes } from "../../components/utils/sizes/sizes";

export const setCartItems = (items: CartItem[]) => {
  return (dispatch: Dispatch<SetItemsAction>) => {
    dispatch({ type: itemsActionType.SET_ITEMS, items: items });
  };
};

export const addItem = (item: {
  product: Product;
  color: Color;
  size: Sizes;
  quantity: number;
}) => {
  return (dispatch: Dispatch<SetItemsAction>) => {
    dispatch({ type: itemsActionType.ADD_ITEM, item: item });
  };
};

export const removeItem = (id: number) => {
  return (dispatch: Dispatch<SetItemsAction>) => {
    dispatch({ type: itemsActionType.REMOVE_ITEM, id: id });
  };
};
