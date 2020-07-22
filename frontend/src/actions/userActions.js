import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';

const signin = (email, password, remember) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload:{email, password}});
    try {
        const {data} = await Axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        // if( remember === true){
        // Cookie.set('userInfo', JSON.stringify(data));
        // }
        Cookie.set('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message});
    }
}

const register = (firstName, lastName, email, phone, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: {firstName, lastName, email, phone, password } });
    try {
      const { data } = await Axios.post("/api/users/register", {firstName, lastName, email, phone, password });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  }

export {signin, register};