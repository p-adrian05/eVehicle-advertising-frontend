import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState={
    ads:[],
    loading:false,
    nextPage:false,
    fetchedUrl:null,
    error:null,
    pageNumber:0,
    queryData:null,
    brandOptions:[],
    types:[],
    updateBrandOptionsCallBack: undefined,
    updateTypeOptionsCallBack: undefined
};
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.INIT_FETCHED_ADS:
            return updateObject(state,{ads:[]});
        case actionTypes.FETCH_ADS_START:
            return updateObject(state,{loading:true});
        case actionTypes.SET_FETCHING_URL:
            return updateObject(state,{fetchedUrl:action.url});
        case actionTypes.FETCH_ADS_SUCCESS:
            let newAds = {...state.ads};
            if(state.ads === undefined){
                newAds = action.ads;
            }else {
                newAds = state.ads.concat(action.ads);
            }
            return updateObject(state,{
                loading: false,
                ads:newAds,
                nextPage:action.next,
                fetchedUrl:action.url,
                queryData:action.queryData,
                pageNumber:action.pageNumber});
        case actionTypes.FETCH_ADS_FAIL:
            return updateObject(state,{loading: false,error:action.error});
        case actionTypes.FETCH_BRANDS_START:
            return updateObject(state,{loading:true});
        case actionTypes.FETCH_BRANDS_FAIL:
            return updateObject(state,{loading: false,error:action.error});
        case actionTypes.FETCH_BRANDS_SUCCESS:
            return updateObject(state,{
                brandOptions:action.brands,loading: false,
                updateBrandOptionsCallBack:action.updateBrandOptionsCallBack
            });
        case actionTypes.FETCH_TYPES_START:
            return updateObject(state,{loading:true});
        case actionTypes.FETCH_TYPES_FAIL:
            return updateObject(state,{loading: false,error:action.error});
        case actionTypes.FETCH_TYPES_SUCCESS:
            return updateObject(state,{
                types:action.types,loading: false,
                updateTypeOptionsCallBack:action.updateTypeOptionsCallBack
            });
        default:
            return {...state};
    }
};
export default reducer;
