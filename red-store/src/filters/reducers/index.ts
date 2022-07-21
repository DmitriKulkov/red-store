import {combineReducers} from "redux";
import {filterReducer} from "./filterReducers";
import {titleReducer} from "./titleReducers";


export const rootReducer = combineReducers({
    filters: filterReducer,
    title: titleReducer
})

export type RootState = ReturnType<typeof rootReducer>