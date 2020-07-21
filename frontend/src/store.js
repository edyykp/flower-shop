import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';


const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
})
const composeEnhancer = compose;
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));
export default store;