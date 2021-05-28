import {combineReducers, createStore,compose , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { productsReducer } from './reducers/product';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const initialState = {};
const store = createStore(combineReducers({
    product:productsReducer
}),
initialState,
composeEnhancer(applyMiddleware(thunk))
)
export default store;