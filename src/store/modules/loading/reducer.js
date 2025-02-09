import * as types from '../types.js';

const initialState = {
  isLoading: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADING_START:
      return { isLoading: true };
    case types.LOADING_END:
      return { isLoading: false };
    default:
      return state;
  }
}