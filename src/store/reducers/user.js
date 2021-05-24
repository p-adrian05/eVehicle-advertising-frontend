import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState={
    loading:false,
    error:null,
    rateLabels:null,
    fullRate:null,
    ads:null
};
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.CREATE_RATE_START:
            return updateObject(state,{loading:true, error:null});
        case actionTypes.CREATE_RATE_SUCCESS:
            return updateObject(state,{loading:false});
        case actionTypes.CREATE_RATE_FAIL:
            return updateObject(state,{loading:false,error:action.error});
        case actionTypes.FETCH_RATE_LABELS_START:
            return updateObject(state,{loading:true, error:null});
        case actionTypes.FETCH_RATE_LABELS_SUCCESS:
            return updateObject(state,{loading:false,rateLabels: action.rateLabels});
        case actionTypes.FETCH_RATE_LABELS_FAIL:
            return updateObject(state,{loading:false,error:action.error});
        case actionTypes.FETCH_FULL_RATE_START:
            return updateObject(state,{loading:true, error:null});
        case actionTypes.FETCH_FULL_RATE_SUCCESS:
            return updateObject(state,{loading:false,fullRate: action.fullRate});
        case actionTypes.FETCH_FULL_RATE_FAIL:
            return updateObject(state,{loading:false,error:action.error});
        case actionTypes.FETCH_USER_ADS_START:
            return updateObject(state,{loading:true, error:null});
        case actionTypes.FETCH_USER_ADS_SUCCESS:
            return updateObject(state,{loading:false,ads:action.ads});
        case actionTypes.FETCH_USER_ADS_FAIL:
            return updateObject(state,{loading:false,error:action.error});
        case actionTypes.CREATE_USER_START:
            return updateObject(state,{loading:true, error:null});
        case actionTypes.CREATE_USER_SUCCESS:
            return updateObject(state,{loading:false});
        case actionTypes.CREATE_USER_FAIL:
            return updateObject(state,{loading:false,error:action.error});

        default:
            return {...state};
    }
};
export default reducer;
