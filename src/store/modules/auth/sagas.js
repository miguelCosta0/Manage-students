import { call, put, all, takeLatest} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios from '../../../services/axios.js';
import * as actions from './actions.js';
import * as loadingActions from '../../../store/modules/loading/actions';
import * as types from '../types.js';


function* LoginRequest({ payload }) {
  try {
    const { email, password } = payload;
    const  response = yield call(axios.post, '/tokens', {email, password});
    yield put(actions.LoginSuccess({...response.data}));

    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

    yield put(loadingActions.LoadingEnd());
    toast.success('Login realizado', {autoClose: 1000});
  } catch (e) {
    console.error(e);
    toast.error('Usuário ou Senha inválidos.');
    yield put(actions.LoginFailure());
  }
}

function* EditUserRequest({ payload }) {
  try {
    const { name, email, password } = payload;
    const response = yield call(axios.patch, '/users', { 
      nome: name, 
      email, 
      password: password || undefined
    });
    yield put(actions.EditUserSuccess({ ...response.data }));
    
    yield put(loadingActions.LoadingEnd());
    toast.success('Conta alterada', { autoClose: 1000 });
    toast.warn('Faça login novamente', { autoClose: 1500 }); 
    yield put(actions.LoginFailure());

  } catch (e) {
    console.error(e);
    toast.error('Não foi possível editar o usuário.')
    yield put(actions.EditUserFailure());
  }
}

function persistRehydrate({ payload }) {
  if (!payload.auth) return;
  
  const token = payload.auth.token;
  if (!token) return;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}


export default all([
  takeLatest(types.LOGIN_REQUEST, LoginRequest),
  takeLatest(types.EDIT_USER_REQUEST, EditUserRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate)
])
