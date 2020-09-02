import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, CHANGE_STATE_REQUEST, CHANGE_STATE_SUCCESS, CHANGE_STATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL
  } from "../constants/orderConstants";
  
  
  function orderCreateReducer(state = {}, action) {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true };
      case ORDER_CREATE_SUCCESS:
        return { loading: false, order: action.payload, success: true };
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  
  function myOrderListReducer(state = {
    orders: []
  }, action) {
    switch (action.type) {
      case MY_ORDER_LIST_REQUEST:
        return { loading: true };
      case MY_ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case MY_ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  function orderListReducer(state = {
    orders: []
  }, action) {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  function orderDeleteReducer(state = {
    order: {
      cartItems: [],
      shipping: {},
      payment: {}
    }
  }, action) {
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return { loading: true };
      case ORDER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ORDER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function orderChangeStateReducer(state = { order: {} }, action) {
    switch(action.type) {
      case CHANGE_STATE_REQUEST:
        return {loading: true};
      case CHANGE_STATE_SUCCESS:
        return {loading: false, success: true, order: action.payload};
      case CHANGE_STATE_FAIL:
        return {loading: false, error: action.payload};
      default: 
        return state;
    }
  }

  function orderDetailsReducer(state = { order: {} }, action) {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return { loading: true };
      case ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload };
      case ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  export {
    orderCreateReducer, myOrderListReducer, orderListReducer, orderDeleteReducer, orderChangeStateReducer, orderDetailsReducer
  }