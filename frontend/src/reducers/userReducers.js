import {USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_CONFIRM_REQUEST, USER_CONFIRM_SUCCESS, USER_CONFIRM_FAIL, USER_UPDATE_USER_REQUEST, USER_UPDATE_USER_SUCCESS, USER_UPDATE_USER_FAIL, USER_UPDATE_PASS_REQUEST, USER_UPDATE_PASS_SUCCESS, USER_UPDATE_PASS_FAIL, USER_CONTACT_REQUEST, USER_CONTACT_SUCCESS, USER_CONTACT_FAIL, USER_FORGOT_REQUEST, USER_FORGOT_SUCCESS, USER_FORGOT_FAIL, USER_RESET_FAIL, USER_RESET_SUCCESS, USER_RESET_REQUEST} from '../constants/userConstants';

function userSigninReducer(state={}, action){
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        case USER_LOGOUT:
            return {};
        default: return state;
    }
}

function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function userConfirmReducer(state = {}, action) {
    switch (action.type) {
      case USER_CONFIRM_REQUEST:
        return { loading: true };
      case USER_CONFIRM_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_CONFIRM_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
  }
}

function userContactReducer(state = {}, action) {
  switch (action.type) {
    case USER_CONTACT_REQUEST:
      return { loading: true };
    case USER_CONTACT_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_CONTACT_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userForgotReducer(state = {}, action) {
  switch (action.type) {
    case USER_FORGOT_REQUEST:
      return { loading: true };
    case USER_FORGOT_SUCCESS:
      return { loading: false, data: action.payload, success: true };
    case USER_FORGOT_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userResetReducer(state = {}, action) {
  switch (action.type) {
    case USER_RESET_REQUEST:
      return { loading: true };
    case USER_RESET_SUCCESS:
      return { loading: false, data: action.payload, success: true };
    case USER_RESET_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_USER_REQUEST:
      return { loading: true };
    case USER_UPDATE_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


function passUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_PASS_REQUEST:
      return { loading: true };
    case USER_UPDATE_PASS_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_PASS_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
export {userSigninReducer, userRegisterReducer, userConfirmReducer, userUpdateReducer, passUpdateReducer, userContactReducer, userForgotReducer, userResetReducer}