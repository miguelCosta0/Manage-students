import React, { useState }from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isEmail } from 'validator';

import axios from '../../../services/axios';
import * as loadingActions from '../../../store/modules/loading/actions';

import './Register.css';

export default function Register() {
  const [user, setUser] = useState();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  return (
    <>
      <h1>Faça seu cadastro</h1>

      <form className="form-register" onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input type="text" name="name" />

        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" />

        <label htmlFor="password">Senha</label>
        <input type="password" name="password" />

        <button className="sign-up-btn">Enviar</button>
      </form>

      {user && <Navigate to='/login' />}
    </>
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.querySelector('input[name="name"]').value;
    const emailInput = document.querySelector('input[name="email"]').value;
    const passwordInput = document.querySelector('input[name="password"]').value;

    let formErrors = validateRegisterForm(nameInput, emailInput, passwordInput);

    if (formErrors.length > 0) {
      return formErrors.map(val => toast.error(val));
    }

    try {
      dispatch(loadingActions.LoadingStart());
      await axios.post('/users/', {
        nome: nameInput,
        email: emailInput,
        password: passwordInput
      });
      setUser({});
    } catch (err) {
      if (err.response) {
        formErrors = [...err.response.data.errors]
        formErrors.map(val => toast.error(val));
      } else {
        console.error(err);
      }
    } finally {
      dispatch(loadingActions.LoadingEnd());
    }
  }
}

function validateRegisterForm(nameInput, emailInput, passwordInput) {
  const formErrors = [];
  if (nameInput.length < 3 || nameInput.length > 255)
    formErrors.push('Nome deve ter entre 3 e 255 caracteres.');
  if (passwordInput.length < 6 || passwordInput.length > 255)
    formErrors.push('Senha deve ter entre 6 e 255 caracteres.');
  if (!isEmail(emailInput))
    formErrors.push('Email inválido.');

  return formErrors;
}