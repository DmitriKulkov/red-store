import { CartItem } from "../../entities/cart-item.entity";
import { Product } from "../../entities/product.entity";
import { Color } from "../../entities/color.entity";
import { Sizes } from "../../components/utils/sizes/sizes";

export enum itemsActionType {
  SET_ITEMS = "SET_ITEMS",
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
}

export type SetItemsAction = SetItems | AddItem | RemoveItem;

interface SetItems {
  type: itemsActionType.SET_ITEMS;
  items: CartItem[];
}

interface AddItem {
  type: itemsActionType.ADD_ITEM;
  item: {
    product: Product;
    color: Color;
    size: Sizes;
    quantity: number;
  };
}

interface RemoveItem {
  type: itemsActionType.REMOVE_ITEM;
  id: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

export const cartReducer = (
  state = initialCartState,
  action: SetItemsAction
): CartState => {
  switch (action.type) {
    case itemsActionType.SET_ITEMS:
      state = { ...state, items: action.items };
      return state;
    case itemsActionType.ADD_ITEM:
      state = {
        items: [
          ...state.items,
          {
            ...action.item,
            id:
              state.items.length !== 0
                ? state.items[state.items.length - 1].id + 1
                : 0,
          },
        ],
      };
      return state;
    case itemsActionType.REMOVE_ITEM:
      state = { items: state.items.filter((item) => item.id !== action.id) };
      return state;
    default:
      return state;
  }
};
