import * as actionTypes from "./actionTypes";
import axios, {auth_header} from '../../axios-ads';


export const createAdStart = ()=>{
    return {
        type:actionTypes.CREATE_AD_START
    };
};
export const createAdFail = (error)=>{
    return {
        type:actionTypes.CREATE_AD_FAIL,
        error:error
    };
};
export const createAdSuccess = ()=>{
    return {
        type:actionTypes.CREATE_AD_SUCCESS
    };
};

export const createAd = (payload,token)=>{
    return dispatch => {
        dispatch(createAdStart());
        axios.post("/advertisement",payload,{headers:auth_header(token)})
            .then(res=>{
                dispatch(createAdSuccess());
            }).catch(err=>{
            dispatch(createAdFail(err.response.data.message));
        });
    }
};
export const updateAd = (payload,id,token)=>{
    return dispatch => {
        dispatch(createAdStart());
        axios.put("/advertisement/"+id,payload,{headers:auth_header(token)})
            .then(res=>{
                dispatch(createAdSuccess());
            }).catch(err=>{
            dispatch(createAdFail(err.response.data.message));
        });
    }
};
export const fetchAdStart = ()=>{
    return {
        type:actionTypes.FETCH_AD_START
    };
};
export const fetchAdFail = (error)=>{
    return {
        type:actionTypes.FETCH_AD_FAIL,
        error:error
    };
};
export const fetchAdSuccess = (data)=>{
    return {
        type:actionTypes.FETCH_AD_SUCCESS,
        adData:data
    };
};
export const fetchAdDetailsStart = ()=>{
    return {
        type:actionTypes.FETCH_AD_DETAILS_START
    };
};
export const fetchAdDetailsFail = (error)=>{
    return {
        type:actionTypes.FETCH_AD_DETAILS_FAIL,
        error:error
    };
};
export const fetchAdDetailsSuccess = (data)=>{
    return {
        type:actionTypes.FETCH_AD_DETAILS_SUCCESS,
        adDetails:data
    };
};

export const fetchAd = (id)=>{
    return dispatch => {
        dispatch(fetchAdStart());
        axios.get("/advertisement/"+id)
            .then(res=> {
                dispatch(fetchAdSuccess(res.data));
            }).catch(err=>{
            dispatch(fetchAdFail(err.message));
        });
        dispatch(fetchAdDetailsStart());
        axios.get("/advertisement/"+id+"/details")
            .then(res=>{
                dispatch(fetchAdDetailsSuccess(res.data));
            }).catch(err=>{
            dispatch(fetchAdDetailsFail(err.message));
        });
    }
};

export const changeStateAd = (id,state,token)=>{
    return dispatch => {
        axios.patch(`advertisement/${id}/${state}`,null,{headers:auth_header(token)}).then(r => r)
            .catch(err=>console.log(err));
    }
};

