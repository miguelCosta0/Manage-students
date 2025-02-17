import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isEmail } from "validator";

import axios from "../../../services/axios";
import * as loadingActions from '../../../store/modules/loading/actions';
import * as authActions from '../../../store/modules/auth/actions';
import StudentProfilePicture from "./profilePic";

import './css/edit.css'

export default function EditStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [student, setStudent] = useState({});
  const [pfpUrl, setPfpUrl] = useState(null);
  const [pfpFile, setPfpFile] = useState(null);
  const [pfpChanged, setPfpChanged] = useState(false);
  const { id: studentId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingActions.LoadingStart());
        const response = await axios(`alunos/${studentId}`);
        setStudent(() => {
          response.data.altura = response.data.altura.toFixed(2).replace('.', ',');
          response.data.peso = response.data.peso.toFixed(2).replace('.', ',');
          response.data.idade = response.data.idade.toString();
          return response.data;
        });
        if (response.data.Photo) {
          setPfpUrl(response.data.Photo.url);
        }
        dispatch(loadingActions.LoadingEnd());
      } catch (e) {
        dispatch(loadingActions.LoadingEnd());
        if (!e.response) {
          return console.error(e);
        }
        if (e.response.status === 400) {
          toast.error(e.response.data);
          return navigate('/students')
        }
        if (e.response.status === 401) {
          dispatch(authActions.LoginFailure());
          return navigate('/login');
        }
      }
    })();
  }, [studentId, dispatch, navigate]);

  return (
    <>
      <h1>Editar Aluno</h1>
      <form className="form-edit-student" onSubmit={handleStudentEdit}>
        <div id='student-pfp' >
          <input type="file" onChange={ChangePfp}></input>
          <div className="select-pfp-hover">
            <button type='button' onClick={selectNewPfp}>Nova imagem</button>
            <button type='button' onClick={removePfp}>Remover</button>
          </div>
          <StudentProfilePicture url={pfpUrl} />
        </div>
        <label>
          Nome:
          <input type="text" id='nome' defaultValue={student.nome} />
        </label>
        <label>
          Sobrenome:
          <input type="text" id='sobrenome' defaultValue={student.sobrenome} />
        </label>
        <label>
          E-mail:
          <input type="email" id='email' defaultValue={student.email} />
        </label>
        <label>
          Idade:
          <input type="text" id='idade' defaultValue={student.idade} />
        </label>
        <label>
          Altura:
          <input type="text" id='altura' defaultValue={student.altura} />
        </label>
        <label>
          peso:
          <input type="text" id='peso' defaultValue={student.peso} />
        </label>

        <button className="edit-student-btn">Enviar</button>
      </form>
    </>
  );

  function selectNewPfp(e) {
    const fileInput = document.querySelector('.form-edit-student input[type="file"]');
    fileInput.click();
  }

  function removePfp(e) {
    setPfpFile(null);
    if (pfpUrl) {
      setPfpUrl(null);
      setPfpChanged(true);
    }
  }

  function ChangePfp(e) {
    const pfpFile = e.target.files[0];
    setPfpFile(pfpFile);
    setPfpUrl(URL.createObjectURL(pfpFile));
    setPfpChanged(true);
  }

  async function handleStudentEdit(e) {
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

    if (
      !pfpChanged &&
      student.nome === nomeInput.value &&
      student.sobrenome === sobrenomeInput.value &&
      student.email === emailInput.value &&
      student.idade === idadeInput.value &&
      student.altura === alturaInput.value &&
      student.peso === pesoInput.value
    ) return;

    const formErrors = validateEditStudentForm(formFields);
    if (formErrors.length > 0)
      return formErrors.map(val => toast.error(val));

    try {
      dispatch(loadingActions.LoadingStart());

      if (pfpChanged && pfpFile) {
        const formData = new FormData();
        formData.append('aluno_id', studentId);
        formData.append('photo_name', pfpFile);
        await axios.post('photos', formData, {
          headers: { "Content-Type": 'multipart/form-data' }
        });
      } else if (pfpChanged && !pfpFile) {
        await axios.delete('photos', {
          data: {
            file_name: student.Photo.file_name
          }
        });
      }

      const response = await axios.patch(`alunos/${studentId}`, formFields);
      setStudent(() => {
        response.data.altura = response.data.altura.toFixed(2).replace('.', ',');
        response.data.peso = response.data.peso.toFixed(2).replace('.', ',');
        response.data.idade = response.data.idade.toString();
        return response.data;
      });
      alturaInput.value = response.data.altura;
      pesoInput.value = response.data.peso;

      dispatch(loadingActions.LoadingEnd());
      return navigate('/');
    } catch (e) {
      dispatch(loadingActions.LoadingEnd());
      if (!e.response)
        return console.error(e);
      if (e.response.status === 401) {
        dispatch(authActions.LoginFailure());
        return navigate('/login');
      }
      console.error(e.response.data);
    }
  }
}


function validateEditStudentForm(formFields) {
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