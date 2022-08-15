import {Dispatch} from "redux";
import {actionType, SetFilterAction} from "../reducers/filterReducers";


export const changeSortPrice = (sortPrice: number) => {
    return (dispatch: Dispatch<SetFilterAction>) => {
        dispatch({type: actionType.SET_SORT_PRICE, sortPrice: sortPrice})
    }
}
export const changePriceDiapason = (priceDiapason: {a: number, b: number}) => {
    return (dispatch: Dispatch<SetFilterAction>) => {
        dispatch({type: actionType.SET_PRICE_DIAPASON, priceDiapason: priceDiapason})
    }
}
export const changeCollection = (collection: string) => {
    return (dispatch: Dispatch<SetFilterAction>) => {
        dispatch({type: actionType.SET_COLLECTION, collection: collection})
    }
}
export const changeGender = (gender: string) => {
    return (dispatch: Dispatch<SetFilterAction>) => {
        dispatch({type: actionType.SET_GENDER, gender: gender})
    }
}

export const changeColors = (color: string) => {
    return (dispatch: Dispatch<SetFilterAction>) => {
        dispatch({type: actionType.SET_COLORS, color: color})
    }
}

export const changeName = (name: string) => {
    return (dispatch: Dispatch<SetFilterAction>) => {
        dispatch({type: actionType.SET_NAME, name: name})
    }
}

export const changeCategory = (category: string) => {
    return (dispatch: Dispatch<SetFilterAction>) => {
        dispatch({type: actionType.SET_CATEGORY, category: category})
    }
}

export const changeGCategory = (globCat: string) => {
    return (dispatch: Dispatch<SetFilterAction>) => {
        dispatch({type: actionType.SET_GCATEGORY, globCat: globCat})
    }
}

export const removeFilters = () => {
    return(dispatch: Dispatch<SetFilterAction>)=> {
        dispatch({type: actionType.REMOVE_FILTERS})
    }
}