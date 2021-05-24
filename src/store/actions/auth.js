import * as actionTypes from "./actionTypes";
import axios from "../../axios-ads";

export const loginUserStart = ()=>{
    return {
        type:actionTypes.LOGIN_USER_START
    };
};
export const loginUserFail = (error)=>{
    return {
        type:actionTypes.LOGIN_USER_FAIL,
        error:error
    };
};
export const loginUserSuccess = (token,username)=>{
    return {
        type:actionTypes.LOGIN_USER_SUCCESS,
        token:token,
        username:username
    };
};

export const loginUser = (username,password)=>{
    return dispatch => {
        dispatch((loginUserStart()));
        axios.post("authenticate", {username:username,password:password})
            .then(res=>{
                localStorage.setItem("token",res.data.jwt);
                localStorage.setItem("username",username);
                dispatch(loginUserSuccess(res.data.jwt,username));
            }).catch(err=>{
            dispatch(loginUserFail(err.response.data.message));
        });
    }
};
export const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    return{
        type:actionTypes.AUTH_LOGOUT
    };
};
export const authCheckState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(logout());
        }else{
            const username = localStorage.getItem('username');
            dispatch(loginUserSuccess(token, username));
            // const expirationDate = new Date(localStorage.getItem("expirationDate"));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {
            //     const username = localStorage.getItem('username');
            //     dispatch(loginUserSuccess(token, username));
            // }
        }
    };
};
