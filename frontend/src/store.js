import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import { userSigninReducer, userRegisterReducer, userConfirmReducer } from './reducers/userReducers';
import { orderCreateReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer, orderChangeStateReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON('cartItems', {sameSite: "Strict", secure: true}) || [];
const userInfo = Cookie.getJSON('userInfo', {sameSite: "Strict", secure: true}) || null;



const initialState = { cart: { cartItems, shipping: {} }, userSignin: {userInfo} };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userConfirm: userConfirmReducer,
    changeStateOrder: orderChangeStateReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;