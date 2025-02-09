import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({element:Element, isClosed, ...rest }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const location = useLocation();
  
  if (!isLoggedIn) {
    return (
      <Navigate to='/login' replace={true} state={location.pathname}/>
    )
  }

  return <Outlet />
}