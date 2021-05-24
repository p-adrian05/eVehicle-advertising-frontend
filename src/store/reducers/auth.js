import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState = {
    token:null,
    error:null,
    loading:false,
    authRedirectPath:"/",
    username:null
};

const reducer = (state=initialState,action)=>{
    switch (action.type){
        case actionTypes.LOGIN_USER_START:
            return updateObject(state,{loading:true, error:null});
        case actionTypes.LOGIN_USER_SUCCESS:
            return updateObject(state,{loading:false,token:action.token,username: action.username});
        case actionTypes.LOGIN_USER_FAIL:
            return updateObject(state,{loading:false,error:action.error});
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, { token: null, userId: null });
        default:
            return state;
    }
}
export default reducer;
