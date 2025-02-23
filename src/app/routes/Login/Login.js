import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isEmail } from 'validator';

import * as authActions from '../../../store/modules/auth/actions';
import * as loadingActions from '../../../store/modules/loading/actions';

import './Login.css';

export default function Login() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const location = useLocation();
  const prevPath = location.state || '/';

  return (
    <>
      <h1>Faça seu Login</h1>

      <form className="form-login" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" />

        <label htmlFor="password">Senha</label>
        <input type="password" name="password" />
        <Link className='link-to-register' to='/register'>Ainda não tem cadastro?</Link>

        <button className="sign-in-btn">Enviar</button>
      </form>
      {isLoggedIn && <Navigate to={prevPath} />}
    </>
  );


  function handleSubmit(e) {
    e.preventDefault();
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    let formErrors = validateLoginForm(email, password);

    if (formErrors.length > 0) {
      toast.dismiss();
      return formErrors.map(val => toast.error(val));
    }
    dispatch(loadingActions.LoadingStart());
    dispatch(authActions.LoginRequest({ email, password }));
  }
}

function validateLoginForm(email, password) {
  const formErrors = [];
  if (password.length < 6 || password.length > 255)
    formErrors.push('Senha deve ter entre 6 e 255 caracteres.');
  if (!isEmail(email))
    formErrors.push('Email inválido.');

  return formErrors;
}