import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as FilterActionCreators from '../filters/action-creators/filters'


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(FilterActionCreators, dispatch)
}