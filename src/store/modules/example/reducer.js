import * as types from '../types.js';

const initialState = {
  BUTTON_CLICKED: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.BUTTON_CLICKED_REQUEST:
      console.log('fazendo a requisição');
      return state;
    case types.BUTTON_CLICKED_SUCCESS:
      console.log('sucesso')
      const newState = { ...state };
      newState.BUTTON_CLICKED = !state.BUTTON_CLICKED;

      return newState;
    case types.BUTTON_CLICKED_FAILURE:
      console.log('deu erro :(');
      return state;

    default:
      return state;
  }
}