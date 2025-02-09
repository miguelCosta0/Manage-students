import * as types from '../types.js';

export function LoginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload
  };
}

export function LoginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  };
}

export function LoginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload
  };
}

export function EditUserRequest(payload) {
  return {
    type: types.EDIT_USER_REQUEST,
    payload
  };
}

export function EditUserSuccess(payload) {
  return {
    type: types.EDIT_USER_SUCCESS,
    payload
  };
}

export function EditUserFailure(payload) {
  return {
    type: types.EDIT_USER_FAILURE,
    payload
  };
} 