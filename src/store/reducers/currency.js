import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState={
    currency:"HUF"
};
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.CURRENCY_SELECTED:
            return updateObject(state,{currency: action.currency});
        default:
            return {...state};
    }
};
export default reducer;
