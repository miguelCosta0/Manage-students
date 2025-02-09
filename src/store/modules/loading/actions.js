import * as types from '../types.js';

export function LoadingStart() {
  return {
    type: types.LOADING_START,
  };
}

export function LoadingEnd() {
  return {
    type: types.LOADING_END,
  };
}