import {combineReducers} from "redux";
import {filterReducer} from "./filterReducers";


export const rootReducer = combineReducers({
    filters: filterReducer,
})

export type RootState = ReturnType<typeof rootReducer>