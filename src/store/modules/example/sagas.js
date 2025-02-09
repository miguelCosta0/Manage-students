import { call, put, all, takeLatest} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions.js';
import * as types from '../types.js';


function requisition() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}


function* exampleRequest() {
  try {
    yield call(requisition);
    yield put(actions.ClickButtonSuccess());
  } catch {
    toast.error('galera acho que')
    yield put(actions.ClickButtonFailure());

  }
}


export default all([
  takeLatest(types.BUTTON_CLICKED_REQUEST, exampleRequest)
])
