import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { postWithToken } from '../api';
import pinUbicacion from '../resources/pin-ubicacion.png'
import imgCategory from '../resources/category2.jpg'
import "../styles/profile.css"
import { authContext } from "../Context/AuthContext";


export default function Profile() {
    const context = useContext(authContext);
    const admin = "admin"
    const applicant = "applicant"
    const employer = "employer"

  return (
    <main className='profile'>
        <h2>Hi! {context.auth.name}</h2>
        {context.auth.role == admin &&<p>Do you want to see all the jobs that you applied?</p>}
        {context.auth.role == admin &&<Link className='btn-link' to="/me">Click Here</Link>}
        {context.auth.role == admin &&<p>Do you want to see all the jobs that you created?</p>}
        {context.auth.role == admin &&<Link className='btn-link' to="/employer">Click Here</Link>}

{/* PUEDO AGREGARLO UN MADE WITH NODEJS & REACT Y DEBAJO LOS AS FOTOS ASI NO QUEDA TAN SOLO JEJEO O AGREGARLE UNA FOTO DE STOCK ESTO PARECE MEJOR */}
 </main>
      
  );
};