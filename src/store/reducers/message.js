import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState={
    sendMessageLoading:false,
    sendMessageError:null,
    readMessageError:null,
    messagePartnersLoading:false,
    messagePartnersError:null,
    messagePartners:null,
    messagesLoading:false,
    messagesError:null,
    messages:null
};
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.SEND_MESSAGE_START:
            return updateObject(state,{sendMessageLoading:true,sendMessageError:null});
        case actionTypes.SEND_MESSAGE_SUCCESS:
            return updateObject(state,{sendMessageLoading:false});
        case actionTypes.SEND_MESSAGE_FAIL:
            return updateObject(state,{sendMessageLoading:false,sendMessageError:action.error});
        case actionTypes.READ_MESSAGE_FAIL:
            return updateObject(state,{readMessageError:action.error});
        case actionTypes.READ_MESSAGE_START:
            return updateObject(state,{readMessageError:null});
        case actionTypes.FETCH_MESSAGE_PARTNERS_START:
            return updateObject(state,{messagePartnersLoading:true,messagePartnersError:null});
        case actionTypes.FETCH_MESSAGE_PARTNERS_SUCCESS:
            return updateObject(state,{messagePartnersLoading:false,messagePartners:action.messagePartnersData});
        case actionTypes.FETCH_MESSAGE_PARTNERS_FAIL:
            return updateObject(state,{messagePartnersLoading:false,messagePartnersError:action.error});
        case actionTypes.FETCH_MESSAGES_START:
            return updateObject(state,{messagesLoading:true,messagesError:null});
        case actionTypes.FETCH_MESSAGES_SUCCESS:
            return updateObject(state,{messagesLoading:false,messages:action.messages});
        case actionTypes.FETCH_MESSAGES_FAIL:
            return updateObject(state,{messagesLoading:false,messagesError:action.error});
        default:
            return {...state};
    }
};
export default reducer;
