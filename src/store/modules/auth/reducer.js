import * as types from '../types.js';
import axios from '../../../services/axios.js';

const initialState = {
  isLoggedIn: false,
  token: '',
  user: {},
}

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case types.LOGIN_FAILURE:
      delete axios.defaults.headers.common.Authorization;
      return initialState;
    case types.LOGIN_SUCCESS:
      newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      return newState;
    case types.EDIT_USER_SUCCESS:
      newState = { ...state };
      const { id, email, nome:name } = action.payload;
      newState.user = { id, email, name };
      return newState;
    default:
      return state;
  }
}