import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user';
import listReducer from './list';
import tripReducer from './trip';
import itemReducer from "./item";
import typeReducer from './type';

const rootReducer = combineReducers({
    user: userReducer,
    list: listReducer,
    trip: tripReducer,
    item: itemReducer,
    type: typeReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
}
else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;