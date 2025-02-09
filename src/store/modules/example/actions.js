import * as types from '../types.js';

export function ClickButtonRequest() {
  return {
    type: types.BUTTON_CLICKED_REQUEST,
  };
}

export function ClickButtonSuccess() {
  return {
    type: types.BUTTON_CLICKED_SUCCESS,
  };
}

export function ClickButtonFailure() {
  return {
    type: types.BUTTON_CLICKED_FAILURE,
  };
} 