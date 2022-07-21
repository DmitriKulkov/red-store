import {Dispatch} from "redux";
import {TitleAction, TitleActionType} from "../reducers/titleReducers";

export const changeTitle = (title: string) =>{
    return (dispatch: Dispatch<TitleAction>) =>{
        dispatch({type: TitleActionType.SET_TITLE, title: title})
    }
}

export const resetTitle = () =>{
    return (dispatch: Dispatch<TitleAction>) =>{
        dispatch({type: TitleActionType.RESET_TITLE})
    }
}