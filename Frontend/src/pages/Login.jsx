import React, {useContext, useRef} from 'react'
import { authContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import "../styles/login.css"

export default function Login() {

    const context = useContext(authContext);
    const navigate = useNavigate()

    const email = useRef()
    const password = useRef()

    //contiene el login de usuarios
    const login = (event)=>{
        event.preventDefault()

        post("/api/auth/login",{ // Peticion de login
            email: email.current.value,
            password:password.current.value
        })
        
    .then(data=>{
        console.log(data)
        console.log(data.data)
        const {token,user} = data.data
        localStorage.setItem("token",token) // Guardamos el token que recibimos
        console.log(context)
        context.setAuth({
            id:user.id,
            name:user.name,
            email: user.email,
            role: user.role,
            logged:true
        })
        console.log(context)
        navigate("/",{
            replace:true
        })
    })

}
  return (
    <div>
        <form onSubmit={login} className="form">
            <div className='items-form' >
            <h2>JobSearch</h2>
            <h3>Login</h3>
                <div className='email'>
                    <FontAwesomeIcon icon={faEnvelope} className="icon-user" /> 
                    <input className='input-email' ref={email} placeholder="Email" type="email"/>
                </div>
            <div className='password'>
            <FontAwesomeIcon icon={faLock} className="icon-lock" />
                <input className='input-password' ref={password} placeholder="Password" type="password"/>
            </div>

            <button className='btn-login'>Login</button>
            <p>Don't have an Account? </p>
            <div className='btn-clickHere'><Link className='btn-signup' to="/signup">Click Here!</Link></div>
            </div>
        </form>
    </div>
  )
}
