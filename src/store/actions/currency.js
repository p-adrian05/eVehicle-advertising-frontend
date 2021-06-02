import * as actionTypes from "./actionTypes";

export const setSelectedCurrency = (currency) => {
    return dispatch => {
        dispatch(
            {
                type: actionTypes.CURRENCY_SELECTED,
                currency: currency
            }
        )
    };
};

