import React from "react";
import { useSelector } from "react-redux";
import './styles.css';


export default function Loading() {
  const isLoading = useSelector(state => state.loading.isLoading);

  if (!isLoading) return <></>

  return (
    <>
      <div className="loading-screen">
        Carregando...
      </div>
    </>
  )
}