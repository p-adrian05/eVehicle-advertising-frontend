import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import searcherReducer from "./store/reducers/searcher";
import adReducer from "./store/reducers/advertisement";
import messageReducer from "./store/reducers/message";
import userReducer from "./store/reducers/user";
import authReducer from "./store/reducers/auth";
import currencyReducer from "./store/reducers/currency";
import {createStore,applyMiddleware,compose,combineReducers} from "redux";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";

const rootReducer =combineReducers({
    adSearcher:searcherReducer,
    ad:adReducer,
    message:messageReducer,
    user:userReducer,
    auth:authReducer,
    currency:currencyReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));


const app=(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(
    app,
    document.getElementById('root')
);

