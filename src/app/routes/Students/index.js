import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaRegEdit, FaRegTrashAlt, FaExclamationTriangle } from 'react-icons/fa'
import { toast } from "react-toastify";

import axios from '../../../services/axios';
import * as loadingActions from '../../../store/modules/loading/actions';
import StudentProfilePicture from "./profilePic";
import './css/index.css';

export default function Students() {
  const [students, setStudents] = useState([]);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(loadingActions.LoadingStart());
      const students = await axios('alunos');
      setStudents(students.data);
      dispatch(loadingActions.LoadingEnd());
    })();
  }, [dispatch])


  return (
    <>
      <h1>Students index</h1>

      <div
        className="create-student-btn"
        onClick={() => navigate('create')}
      >
        Cadastrar novo Aluno
      </div>

      <div className="students">
        {students.map((val, i) => {
          const url = val.Photo ? val.Photo.url : null;

          return (
            <div className="student" key={val.id} id={`studentID${val.id}`}>
              <div className="student-pfp">
                <StudentProfilePicture url={url} />
              </div>
              <div>{`${val.nome} ${val.sobrenome}`}</div>
              <div>{val.email}</div>
              <div>
                <div
                  className="edit-btn"
                  onClick={(e) => handleEdit(e, val.id)}
                >
                  <FaRegEdit size={20} />
                </div>
                <div
                  className="confirm-delete-btn"
                  onClick={(e) => confirmDelete(e, val.id)}
                >
                  <FaExclamationTriangle size={20} />
                </div>
                <div
                  className="delete-btn"
                  onClick={(e) => handleDelete(e, val.id)}
                >
                  <FaRegTrashAlt size={20} />
                </div>
              </div>
            </ div>
          )
        })}
      </div>
    </>
  );

  function handleEdit(e, id) {
    navigate(`edit/${id}`);
  }

  async function confirmDelete(e, id) {
    if (!isLoggedIn)
      return toast.error('É necessário fazer login', { autoClose: 1000 });

    dispatch(loadingActions.LoadingStart());
    await axios.delete(`alunos/${id}`);
    const students = await axios('alunos');
    setStudents(students.data);
    dispatch(loadingActions.LoadingEnd());
  }

  function handleDelete(e, id) {
    const deleteBtn = document.querySelector(`#studentID${id} .delete-btn`);
    const confirmDeleteBtn = document.querySelector(`#studentID${id} .confirm-delete-btn`);

    deleteBtn.style.display = 'none';
    confirmDeleteBtn.style.display = 'inline-block';

    setTimeout(() => {
      deleteBtn.style.display = 'inline-block';
      confirmDeleteBtn.style.display = 'none';
    }, 2000);
  }
}
