import * as actionTypes from "./actionTypes";
import ad_axios from "../../axios-ads";
import {auth_header} from "../../axios-ads";
import axios from "axios";
import {convertSearchParamsFromObject} from "../../shared/utility";

export const createRateStart = ()=>{
    return {
        type:actionTypes.CREATE_RATE_START
    };
};
export const createRateFail = (error)=>{
    return {
        type:actionTypes.CREATE_RATE_FAIL,
        error:error
    };
};
export const createRateSuccess = ()=>{
    return {
        type:actionTypes.CREATE_RATE_SUCCESS
    };
};

export const createRate = (payload,rateStatus,token)=>{
    return dispatch => {
        dispatch(createRateStart());
        ad_axios.post(`rate/${rateStatus}`,payload,{headers:auth_header(token)})
            .then(res=>{
                dispatch(createRateSuccess());
            })
            .catch(error=>{
                dispatch(createRateFail(error.response.data.message));
            })
    }
};
export const fetchRateLabelsStart = ()=>{
    return {
        type:actionTypes.FETCH_RATE_LABELS_START
    };
};
export const fetchRateLabelsFail = (error)=>{
    return {
        type:actionTypes.FETCH_RATE_LABELS_FAIL,
        error:error
    };
};
export const fetchRateLabelsSuccess = (data)=>{
    return {
        type:actionTypes.FETCH_RATE_LABELS_SUCCESS,
        rateLabels:data
    };
};
export const fetchFullRateStart = ()=>{
    return {
        type:actionTypes.FETCH_FULL_RATE_START
    };
};
export const fetchFullRateFail = (error)=>{
    return {
        type:actionTypes.FETCH_FULL_RATE_FAIL,
        error:error
    };
};
export const fetchFullRateSuccess = (data)=>{
    return {
        type:actionTypes.FETCH_FULL_RATE_SUCCESS,
        fullRate:data
    };
};
export const fetchRateLabels = (username,page,token)=>{
    return dispatch => {
        dispatch(fetchRateLabelsStart());
        ad_axios.get(`rates/${username}?page=${page}&size=15`,{headers:auth_header(token)})
            .then(res=>{
                dispatch(fetchRateLabelsSuccess(res.data));
            })
            .catch(error=>{
                dispatch(fetchRateLabelsFail(error.message));
            })
    }
};
export const fetchFullRate= (username1,username2,adId,token)=>{
    return dispatch => {
        dispatch(fetchFullRateStart());
        const requestOne = ad_axios.get(`rates/?ratedUsername=${username1}&ratingUsername=${username2}&advertisementId=${adId}`,{headers:auth_header(token)});
        const requestTwo = ad_axios.get(`rates/?ratedUsername=${username2}&ratingUsername=${username1}&advertisementId=${adId}`,{headers:auth_header(token)});
        axios.all([requestOne,requestTwo])
            .then(res =>{
                   dispatch(fetchFullRateSuccess([res[0].data.content[0],res[1].data.content[0]]));
            })
            .catch(error=>{
                dispatch(fetchFullRateFail(error.message));
            })
    }
};
export const fetchUserAdsStart = ()=>{
    return {
        type:actionTypes.FETCH_USER_ADS_START
    };
};
export const fetchUserAdsFail = (error)=>{
    return {
        type:actionTypes.FETCH_USER_ADS_FAIL,
        error:error
    };
};
export const fetchUserAdsSuccess = (data)=>{
    return {
        type:actionTypes.FETCH_USER_ADS_SUCCESS,
        ads:data
    };
};
export const createUserStart = ()=>{
    return {
        type:actionTypes.CREATE_USER_START
    };
};
export const createUserFail = (error)=>{
    return {
        type:actionTypes.CREATE_RATE_FAIL,
        error:error
    };
};
export const createUserSuccess = ()=>{
    return {
        type:actionTypes.CREATE_RATE_SUCCESS,
    };
};
export const fetchUserAds = (username,queryData,token)=>{
    return dispatch => {
        dispatch(fetchUserAdsStart());
        let queryParams =  convertSearchParamsFromObject(queryData);
        ad_axios.get(`advertisements/${username}?${queryParams}`,{headers:auth_header(token)})
            .then(res=>{
                dispatch(fetchUserAdsSuccess(res.data));
            }).catch(err=>{
            dispatch(fetchUserAdsFail(err.message));
        });
    }
};

export const createUser = (payload)=>{
    return dispatch => {
        dispatch((createUserStart()));
        ad_axios.post("user",payload)
            .then(res=>{
                dispatch(createUserSuccess());
            }).catch(err=>{
            dispatch(createUserFail(err.response.data.message));
        });
    }
};
