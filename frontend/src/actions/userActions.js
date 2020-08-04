import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_RESET_REQUEST, USER_RESET_SUCCESS, USER_RESET_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_CONFIRM_FAIL, USER_CONFIRM_SUCCESS, USER_CONFIRM_REQUEST, USER_UPDATE_USER_REQUEST, USER_UPDATE_USER_SUCCESS, USER_UPDATE_USER_FAIL, USER_UPDATE_PASS_REQUEST, USER_UPDATE_PASS_SUCCESS, USER_UPDATE_PASS_FAIL, USER_CONTACT_REQUEST, USER_CONTACT_SUCCESS, USER_CONTACT_FAIL, USER_FORGOT_REQUEST, USER_FORGOT_SUCCESS, USER_FORGOT_FAIL } from '../constants/userConstants';

const signin = (email, password, remember) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload:{email, password}});
    try {
        const {data} = await Axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
         if( remember === true){
         Cookie.set('userInfo', JSON.stringify(data), {sameSite: "Strict", secure: true, expires: 3000});
        }
        else
        Cookie.set('userInfo', JSON.stringify(data), {sameSite: "Strict", secure: true});
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

  const logout = () => (dispatch) => {
    Cookie.remove("userInfo", {sameSite: "Strict", secure: true});
    dispatch({ type: USER_LOGOUT })
  }

  const confirmEmail = (id) => async (dispatch) => {
    dispatch({type: USER_CONFIRM_REQUEST, payload: id});
    try {
      const {data} = await Axios.put("/api/users/confirmemail/" + id, {id});
      dispatch({type: USER_CONFIRM_SUCCESS, payload: data});
    }
    catch(error) {
      dispatch({type: USER_CONFIRM_FAIL, payload: error.message});
    }
  }

  const contactEmail = ({name,email,phone,subject,message}) => async (dispatch) => {
    dispatch({type: USER_CONTACT_REQUEST, payload: {email,name, phone, subject, message}});
    try {
      const {data} = await Axios.put("/api/users/contact", {name,email,phone,subject,message});
      dispatch({type: USER_CONTACT_SUCCESS, payload: data});
    }
    catch(error) {
      dispatch({type: USER_CONTACT_FAIL, payload: error.message});
    }
  }

  const resetEmail = ({password, resetLink}) => async (dispatch) => {
    dispatch({type: USER_RESET_REQUEST, payload: {password, resetLink}});
    try {
      const {data} = await Axios.put("/api/users/reset-password" , {password, resetLink});
      dispatch({type: USER_RESET_SUCCESS, payload: data});
    }
    catch(error) {
      dispatch({type: USER_RESET_FAIL, payload: error.message});
    }
  }

  const forgotEmail = (email) => async (dispatch) => {
    dispatch({type: USER_FORGOT_REQUEST, payload: email});
    try {
      const {data} = await Axios.put("/api/users/forgotPass", {email});
      dispatch({type: USER_FORGOT_SUCCESS, payload: data});
    }
    catch(error) {
      dispatch({type: USER_FORGOT_FAIL, payload: error.message});
    }
  }

  const updateUser = ({ userId, firstName, lastName, email, phone, address, companyName, cui }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_USER_REQUEST, payload: { userId, firstName, lastName, email, phone, address, companyName, cui } });
    try {
      const { data } = await Axios.put("/api/users/updateUser/" + userId,
        { firstName, lastName, email, phone, address, companyName, cui }, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: USER_UPDATE_USER_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data), {sameSite: "Strict", secure: true});
    } catch (error) {
      dispatch({ type: USER_UPDATE_USER_FAIL, payload: error.message });
    }
  }

  const updatePass = ({ userId, newPassword }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_PASS_REQUEST, payload: { userId, newPassword } });
    try {
      const { data } = await Axios.put("/api/users/updatePass/" + userId,
        { newPassword }, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: USER_UPDATE_PASS_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data), {sameSite: "Strict", secure: true});
    } catch (error) {
      dispatch({ type: USER_UPDATE_PASS_FAIL, payload: error.message });
    }
  }
export {signin, register, logout, confirmEmail, updateUser, updatePass, contactEmail, forgotEmail, resetEmail};