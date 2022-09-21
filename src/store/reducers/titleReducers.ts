export enum TitleActionType {
  SET_TITLE = "SET_TITLE",
  RESET_TITLE = "RESET_TITLE",
}

export type TitleAction = SetTitleAction | ResetTitleAction;

interface SetTitleAction {
  type: TitleActionType.SET_TITLE;
  title: string;
}

interface ResetTitleAction {
  type: TitleActionType.RESET_TITLE;
}

export const initialTitleState: TitleState = {
  title: "Filters",
};

interface TitleState {
  title: string;
}

export const titleReducer = (
  state = initialTitleState,
  action: TitleAction
): TitleState => {
  switch (action.type) {
    case TitleActionType.SET_TITLE:
      state = { title: action.title };
      return state;
    case TitleActionType.RESET_TITLE:
      state = initialTitleState;
      return state;
    default:
      return state;
  }
};
