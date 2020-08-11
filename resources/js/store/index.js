import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducers";
let initalState = {};
import thunk from 'redux-thunk';

const store = createStore(rootReducer,
    initalState,
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
