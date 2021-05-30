import * as actionTypes from "./actionTypes";
import axios, {auth_header} from '../../axios-ads';


export const sendMessageStart = ()=>{
    return {
        type:actionTypes.SEND_MESSAGE_START
    };
};

export const sendMessageSuccess = ()=>{
    return {
        type:actionTypes.SEND_MESSAGE_SUCCESS,

    };
};
export const sendMessageFail = (error)=>{
    return {
        type:actionTypes.SEND_MESSAGE_FAIL,
        error:error
    };
};
export const readMessageStart = ()=>{
    return {
        type:actionTypes.READ_MESSAGE_START
    };
};
export const readMessageFail = (error)=>{
    return {
        type:actionTypes.READ_MESSAGE_FAIL,
        error:error
    };
};
export const fetchMessagePartnersStart = ()=>{
    return {
        type:actionTypes.FETCH_MESSAGE_PARTNERS_START
    };
};

export const fetchMessagePartnersSuccess = (partnersData)=>{
    return {
        type:actionTypes.FETCH_MESSAGE_PARTNERS_SUCCESS,
        messagePartnersData:partnersData

    };
};
export const fetchMessagePartnersFail = (error)=>{
    return {
        type:actionTypes.FETCH_MESSAGE_PARTNERS_FAIL,
        error:error
    };
};
export const fetchMessagesStart = ()=>{
    return {
        type:actionTypes.FETCH_MESSAGES_START
    };
};

export const fetchMessagesSuccess = (messages)=>{
    return {
        type:actionTypes.FETCH_MESSAGES_SUCCESS,
        messages:messages

    };
};
export const fetchMessagesFail = (error)=>{
    return {
        type:actionTypes.FETCH_MESSAGES_FAIL,
        error:error
    };
};
export const sendMessage = (payload,token)=>{
    return dispatch => {
        dispatch(sendMessageStart());
        axios.post("/message",payload,{headers:auth_header(token)})
            .then(res=>{
                dispatch(sendMessageSuccess());
            }).catch(err=>{
            dispatch(sendMessageFail(err.response.data.message));
        });
    }
};

export const readMessage = (payload,token)=>{
    return dispatch => {
        dispatch(readMessageStart());
        axios.patch("/messages/read",payload,{headers:auth_header(token)})
            .catch(err=>{
                dispatch(readMessageFail(err.response.data.message));
            })
    }
};

export const fetchMessagePartners = (username,page,token)=>{
    return dispatch => {
        dispatch(fetchMessagePartnersStart());
        axios.get(`messages/partners?username=${username}&page=${page}`,{headers:auth_header(token)})
            .then(res=>{
                dispatch(fetchMessagePartnersSuccess(res.data));
            })
            .catch(error=>{
                dispatch(fetchMessagePartnersFail(error.response.data.message));
            });
    }
};
export const fetchMessages = (authUser,partnerName,page,token)=>{
    return dispatch => {
        dispatch(fetchMessagesStart());
        axios.get(`messages?username=${authUser}&partnerUsername=${partnerName}&page=${page}`,{headers:auth_header(token)})
            .then(res=>{
                dispatch(fetchMessagesSuccess(res.data));
            })
            .catch(error=>{
                dispatch(fetchMessagesFail(error.response.data.message));
            });
    }
};
