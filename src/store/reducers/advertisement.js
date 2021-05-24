import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState={
    loading:false,
    createAdError:null,
    adDetails:null,
    adData:null,
    fetchAdLoading:false,
    fetchAdDetailsError:null,
    fetchAdDataError:null
};
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.CREATE_AD_START:
            return updateObject(state,{loading:true,createAdError:null});
        case actionTypes.CREATE_AD_FAIL:
            return updateObject(state,{loading:false,createAdError:action.error});
        case actionTypes.CREATE_AD_SUCCESS:
            return updateObject(state,{loading:false});
        case actionTypes.FETCH_AD_START:
            return updateObject(state,{loading:true,fetchAdDataError:null});
        case actionTypes.FETCH_AD_SUCCESS:
            return updateObject(state,{loading:false,fetchAdDataError:null,adData:action.adData});
        case actionTypes.FETCH_AD_FAIL:
            return updateObject(state,{fetchAdDataError:action.error});
        case actionTypes.FETCH_AD_DETAILS_START:
            return updateObject(state,{loading:true,fetchAdDetailsError:null});
        case actionTypes.FETCH_AD_DETAILS_SUCCESS:
            return updateObject(state,{loading:false,fetchAdDetailsError:null,adDetails:action.adDetails});
        case actionTypes.FETCH_AD_DETAILS_FAIL:
            return updateObject(state,{loading:false,fetchAdDetailsError:action.error});
        default:
            return {...state};
    }
};
export default reducer;
