import {combineReducers, createStore,compose , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cart';
import { productsReducer } from './reducers/product';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const initialState = {};
const store = createStore(combineReducers({
    product:productsReducer,
    cart:cartReducer,
}),
initialState,
composeEnhancer(applyMiddleware(thunk))
)
export default store;