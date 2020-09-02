import Axios from "axios";
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, CHANGE_STATE_REQUEST, CHANGE_STATE_SUCCESS, CHANGE_STATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { userSignin: { userInfo } } = getState();
        const { data: { data: newOrder } } =  userInfo ? await Axios.post("/api/orders", order, {
                                                            headers: {
                                                            Authorization: ' Bearer ' + userInfo.token
                                                            }
                                                        })
                                                                :
                                                        await Axios.post("/api/orders", order);
    
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/" + userInfo._id, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}

const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}


const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.delete("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
}

const changeOrder = (order) => async (dispatch, getState) => {
  
  try {
    dispatch({type: CHANGE_STATE_REQUEST, payload: order});
    const { userSignin: { userInfo } } = getState();
    const {data} = await Axios.put("/api/orders/" + order.id, order, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({type: CHANGE_STATE_SUCCESS, payload: data});
  }
  catch(error) {
    dispatch({type: CHANGE_STATE_FAIL, payload: error.message});
  }
}

const detailsOrder = (orderId) => async (dispatch) => {
  try {
      dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
      const {data} = await Axios.get("/api/orders/getorder/" + orderId);
      dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
  } catch (error){
      dispatch({type: ORDER_DETAILS_FAIL, payload:error.message});
  }
}

export { createOrder, listMyOrders, listOrders, deleteOrder, changeOrder, detailsOrder };