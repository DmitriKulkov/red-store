import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import ActionCreators from "../filters/action-creators/";

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}