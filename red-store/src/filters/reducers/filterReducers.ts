import {Color} from "../../entities/color.entity";

export enum actionType {
    SET_SORT_PRICE = "SET_SORT_PRICE",
    SET_PRICE_DIAPASON = "SET_PRICE_DIAPASON",
    SET_COLLECTION = "SET_COLLECTION",
    SET_GENDER = "SET_GENDER",
    SET_COLORS = "SET_COLORS",
    REMOVE_FILTERS = "REMOVE_FILTERS",
}

export type SetFilterAction = SetSortPriceAction | SetPriceDiapasonAction | SetCollectionAction | SetGenderAction | SetColorAction | RemoveFiltersAction

export interface SetSortPriceAction {
    type: actionType.SET_SORT_PRICE;
    sortPrice: number;
}
export interface SetPriceDiapasonAction {
    type: actionType.SET_PRICE_DIAPASON;
    priceDiapason: {a: number, b: number};
}
export interface SetCollectionAction {
    type: actionType.SET_COLLECTION;
    collection: string;
}
export interface SetGenderAction {
    type: actionType.SET_GENDER;
    gender: string;
}
export interface SetColorAction {
    type: actionType.SET_COLORS;
    color: string;
}

export interface RemoveFiltersAction {
    type: actionType.REMOVE_FILTERS;
}

export interface FilterState {
    sortPrice: number;
    priceDiapason: {a: number, b: number};
    collection?: string;
    gender?: string;
    cColors: string[];
}

export const initialState: FilterState = {
    sortPrice: 1,
    priceDiapason: {a: 0, b:10000},
    // gender: "",
    cColors: []
}

export const filterReducer= (state = initialState, action: SetFilterAction): FilterState => {
    switch (action.type) {
        case actionType.SET_SORT_PRICE:
            state.sortPrice = action.sortPrice
            return state
        case actionType.SET_PRICE_DIAPASON:
            state.priceDiapason = action.priceDiapason
            return state
        case actionType.SET_COLLECTION:
            state.collection = action.collection
            return state
        case actionType.SET_GENDER:
            state.gender = action.gender
            return state
        case actionType.SET_COLORS:
            !state.cColors.includes(action.color)
                ? state.cColors = state.cColors.concat(action.color)
                : state.cColors = state.cColors.filter(function (ccol) {
                    return ccol !== action.color
                })
            return state
        case actionType.REMOVE_FILTERS:
            state = initialState
            return state
        default:
            return state
    }
}