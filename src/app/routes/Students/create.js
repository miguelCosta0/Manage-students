import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isEmail } from "validator";

import axios from "../../../services/axios";
import * as loadingActions from '../../../store/modules/loading/actions';
import * as authActions from '../../../store/modules/auth/actions';

import './css/create.css'

export default function CreateStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <h1>Cadastrar Novo Aluno</h1>

      <form className="form-create-student" onSubmit={handleCreateStudent}>
        <label>
          Nome:
          <input type="text" id='nome' />
        </label>
        <label>
          Sobrenome:
          <input type="text" id='sobrenome' />
        </label>
        <label>
          E-mail:
          <input type="email" id='email' />
        </label>
        <label>
          Idade:
          <input type="text" id='idade' />
        </label>
        <label>
          Altura:
          <input type="text" id='altura' />
        </label>
        <label>
          peso:
          <input type="text" id='peso' />
        </label>

        <button className="create-student-btn">Enviar</button>
      </form>
    </>
  );

  async function handleCreateStudent(e) {
    e.preventDefault();

    const nomeInput = document.querySelector('input#nome');
    const sobrenomeInput = document.querySelector('input#sobrenome');
    const emailInput = document.querySelector('input#email');
    const idadeInput = document.querySelector('input#idade');
    const alturaInput = document.querySelector('input#altura');
    const pesoInput = document.querySelector('input#peso');

    const formFields = {
      nome: nomeInput.value,
      sobrenome: sobrenomeInput.value,
      email: emailInput.value,
      idade: Number(idadeInput.value),
      altura: Number(Number(alturaInput.value.replace(',', '.')).toFixed(2)),
      peso: Number(Number(pesoInput.value.replace(',', '.')).toFixed(2))
    };

    const formErrors = validateCreateStudentForm(formFields);
    if (formErrors.length > 0)
      return formErrors.map(val => toast.error(val));

    try {
      dispatch(loadingActions.LoadingStart());
      await axios.post('alunos', formFields);
      dispatch(loadingActions.LoadingEnd());
      navigate('/students');
    } catch (e) {
      dispatch(loadingActions.LoadingEnd());
      if (!e.response)
        return console.error(e);
      if (e.response.status === 400)
        return toast.error(e.response.data);
      if (e.response.status === 401) {
        dispatch(authActions.LoginFailure());
        return navigate('/login');
      }
    }
  }
}


function validateCreateStudentForm(formFields) {
  const { nome, sobrenome, email, idade, altura, peso } = formFields;

  const formErrors = [];
  if (nome.length < 3 || nome.length > 255)
    formErrors.push('Nome deve ter entre 3 e 255 caracteres.');
  if (sobrenome.length < 3 || sobrenome.length > 255)
    formErrors.push('Sobrenome deve ter entre 3 e 255 caracteres.');
  if (!isEmail(email))
    formErrors.push('Email inválido.');
  if (!Number.isInteger(idade))
    formErrors.push('Idade deve ser um número inteiro.');
  if (Number.isNaN(altura))
    formErrors.push('Altura deve ser um número.');
  if (Number.isNaN(peso))
    formErrors.push('Peso deve ser um número.');

  return formErrors;
}