import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as loadingActions from '../../../store/modules/loading/actions';

import './css/index.css';

export default function User() {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user)
  useDispatch(loadingActions.LoadingEnd());
  return (
    <>
      <h1>Minha conta</h1>

      <div className="user-information">
        <h2 className="name">Nome:</h2>
        <p>{user.name}</p>

        <h2>Email:</h2>
        <p>{user.email}</p>

        <button 
          className="edit-user-btn" 
          type="button" 
          onClick={() => navigate('/user/edit')}
        >
          Editar
        </button>
      </div>
      
    </>
  );

}