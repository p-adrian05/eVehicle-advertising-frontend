import * as actionTypes from "./actionTypes";
import axios from '../../axios-ads';
import {convertSearchParamsFromObject} from "../../shared/utility";

export const fetchAdsSuccess = (ads,url,next,pageNumber,queryData)=>{
    return {
        type:actionTypes.FETCH_ADS_SUCCESS,
        ads:ads,
        url:url,
        next:next,
        pageNumber:pageNumber,
        queryData:queryData
    };
};

export const fetchAdsFail = (error)=>{
    return {
        type:actionTypes.FETCH_ADS_FAIL,
        error:error
    };
};
export const fetchAdsStart = ()=>{
    return {
        type:actionTypes.FETCH_ADS_START
    };
};
export const initialFetchedAds = ()=>{
    return {
        type:actionTypes.INIT_FETCHED_ADS
    };
};
export const fetchBrands = (categoryName,callback,inputId)=>{
    return dispatch => {
        dispatch(fetchBrandsStart());
        axios.get(`advertisement/brands/${categoryName}`)
            .then(res=>{
                dispatch(fetchBrandsSuccess(res.data,callback));
                callback(res.data,inputId);
            }).catch(err=>{
            console.log(err);
            dispatch(fetchBrandsFail(err.message));
        });
    }
};
export const fetchTypes= (brandName,category,callback,inputId)=>{
    return dispatch => {
        let queryParam = category !== null ? "category="+category : "";
        if((brandName === null || brandName === "" ) && callback!==undefined) {
            setTimeout(()=>{callback([],inputId)},300);
        }else{
            dispatch(fetchTypesStart());
            axios.get(`advertisement/brand/${brandName}/types?${queryParam}`)
                .then(res=>{
                    dispatch(fetchTypesSuccess(res.data,callback));
                    callback(res.data,inputId);
                }).catch(err=>{
                dispatch(fetchTypesFail(err.message));
            });
        }

    }
};

export const fetchBrandsSuccess = (brands,callback)=>{
    return {
        type:actionTypes.FETCH_BRANDS_SUCCESS,
        brands:brands,
        updateBrandOptionsCallBack:callback
    };
};

export const fetchBrandsFail = (error)=>{
    return {
        type:actionTypes.FETCH_BRANDS_FAIL,
        error:error
    };
};
export const fetchTypesStart = ()=>{
    return {
        type:actionTypes.FETCH_TYPES_START
    };
};

export const fetchTypesSuccess = (types,callback)=>{
    return {
        type:actionTypes.FETCH_TYPES_SUCCESS,
        types:types,
        updateTypeOptionsCallBack:callback
    };
};

export const fetchTypesFail = (error)=>{
    return {
        type:actionTypes.FETCH_TYPES_FAIL,
        error:error
    };
};
export const fetchBrandsStart = ()=>{
    return {
        type:actionTypes.FETCH_BRANDS_START
    };
};

export const fetchAds = (queryData)=>{
    return dispatch => {
       dispatch(fetchAdsStart());
         let queryParams =  convertSearchParamsFromObject(queryData);
        axios.get(`advertisements?${queryParams}`)
            .then(res=>{
                dispatch(fetchAdsSuccess(res.data.content,res.config.url,!res.data.last,res.data.pageable.pageNumber,queryData));
            }).catch(err=>{
                console.log(err);
            dispatch(fetchAdsFail(err.message));
        });
    }
};
