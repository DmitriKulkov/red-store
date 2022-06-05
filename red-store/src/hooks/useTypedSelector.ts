import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../filters/reducers";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector