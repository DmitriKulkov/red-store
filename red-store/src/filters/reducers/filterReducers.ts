
export enum actionType {
    SET_SORT_PRICE = "SET_SORT_PRICE",
    SET_PRICE_DIAPASON = "SET_PRICE_DIAPASON",
    SET_COLLECTION = "SET_COLLECTION",
    SET_GENDER = "SET_GENDER",
    SET_COLORS = "SET_COLORS",
    REMOVE_FILTERS = "REMOVE_FILTERS",
    SET_NAME = "SET_NAME",
    SET_CATEGORY = "SET_CATEGORY",
}

export type SetFilterAction = SetSortPriceAction |
    SetPriceDiapasonAction |
    SetCollectionAction |
    SetGenderAction |
    SetColorAction |
    SetNameAction |
    SetCategoryAction |
    RemoveFiltersAction

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

export interface SetNameAction {
    type: actionType.SET_NAME;
    name: string;
}

export interface SetCategoryAction {
    type: actionType.SET_CATEGORY;
    category: string;
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
    name?: string;
    category?: string;
}

export const initialState: FilterState = {
    sortPrice: 1,
    priceDiapason: {a: 0, b:10000},
    cColors: [],
}

export const filterReducer= (state = initialState, action: SetFilterAction): FilterState => {
    switch (action.type) {
        case actionType.SET_SORT_PRICE:
            state = {...state, sortPrice: action.sortPrice}
            return state
        case actionType.SET_PRICE_DIAPASON:
            state = {...state, priceDiapason: action.priceDiapason}
            return state
        case actionType.SET_COLLECTION:
            state = {...state, collection: action.collection}
            return state
        case actionType.SET_GENDER:
            state = {...state, gender: action.gender}
            return state
        case actionType.SET_COLORS:
            !state.cColors.includes(action.color)
                ? state = {...state, cColors: state.cColors.concat(action.color)}
                : state = {
                    ...state,
                    cColors: state.cColors.filter(function (ccol) {
                        return ccol !== action.color
                    })
                }
            return state
        case actionType.SET_NAME:
            state = {...state, name: action.name}
            return state
        case actionType.SET_CATEGORY:
            state = {...state, category: action.category}
            return state
        case actionType.REMOVE_FILTERS:
            state = initialState
            return state
        default:
            return state
    }
}