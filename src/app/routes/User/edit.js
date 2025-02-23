import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isEmail } from 'validator';

import * as loadingActions from '../../../store/modules/loading/actions';
import * as authActions from '../../../store/modules/auth/actions';

import './css/edit.css';

export default function Register() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Editar Usuário</h1>

      <form className="form-edit-user" onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input type="text" name="name" placeholder={user.name}/>

        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" placeholder={user.email}/>

        <label htmlFor="password">Senha</label>
        <input 
          type="password" 
          name="password" 
          placeholder="Deixe este campo vazio para manter a sua senha"
        />

        <button className="edit-user-btn">Enviar</button>
      </form>
    </>
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    const name = nameInput.value || user.name;
    const email = emailInput.value || user.email;
    const password = passwordInput.value;

    if (!nameInput.value && !emailInput.value && !password) return;

    let formErrors = validateEditUserForm(name, email, password);

    if (formErrors.length > 0) {
      return formErrors.map(val => toast.error(val));
    }
    e.target.reset();
    dispatch(loadingActions.LoadingStart());
    dispatch(authActions.EditUserRequest({ name, email, password }));
  }
}

function validateEditUserForm(name, email, password) {
  const formErrors = [];
  if (name.length < 3 || name.length > 255)
    formErrors.push('Nome deve ter entre 3 e 255 caracteres.');
  if (password.length > 0 && (password.length < 6 || password.length > 255))
    formErrors.push('Senha deve ter entre 6 e 255 caracteres.');
  if (!isEmail(email))
    formErrors.push('Email inválido.');

  return formErrors;
}