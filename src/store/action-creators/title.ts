import { Dispatch } from "redux";
import { TitleAction, TitleActionType } from "../reducers/titleReducers";

export const changeTitle = (title: string) => {
  return (dispatch: Dispatch<TitleAction>) => {
    title.length > 25
      ? dispatch({
          type: TitleActionType.SET_TITLE,
          title: title.slice(0, 23) + "...",
        })
      : dispatch({ type: TitleActionType.SET_TITLE, title: title });
  };
};

export const resetTitle = () => {
  return (dispatch: Dispatch<TitleAction>) => {
    dispatch({ type: TitleActionType.RESET_TITLE });
  };
};
