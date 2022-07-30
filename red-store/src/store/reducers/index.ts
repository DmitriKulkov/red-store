import {combineReducers} from "redux";
import {filterReducer} from "./filterReducers";
import {titleReducer} from "./titleReducers";
import {cartReducer} from "./cartRedusers";


export const rootReducer = combineReducers({
    filters: filterReducer,
    title: titleReducer,
    cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>