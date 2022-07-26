import React, {useContext, useRef, useState} from 'react'
import { post } from '../api'
import { authContext } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faLock, faUser, faUserTag} from '@fortawesome/free-solid-svg-icons'
import "../styles/login.css"

export default function SignUp() {
  const context = useContext(authContext)
  const [error, setError] = useState({
    isError:false,
    message:"",
    loading:false
  });
  const navigate = useNavigate()
  const name = useRef()
  const email = useRef()
  const password = useRef()
  const role = useRef()


  const signup = (event) =>{
    event.preventDefault()
    console.log(role.current.value);
    setError({...error,loading:true})
    post("/api/auth/signup",{
      name:name.current.value,
      email: email.current.value,
      password:password.current.value,
      role:role.current.value
    })
    .then(({data})=>{
      console.log(data)
      setError({...error,loading:false})
      localStorage.setItem("token",data.token)
      context.setAuth({
        id:data.user.id,
        name:data.user.name,
        email: data.user.email,
        role: data.user.role,
        logged:true
      })
      navigate("/",{
        replace:true
    })
    })
    .catch(error=>{
      console.log(error.response.data);
      setError({
        isError:true,
        message:error.response.data.message,
        loading:false
      })
    })


  }



return (
  <div>
      <form onSubmit={signup}className="form">
      <div className='items-form' >
          <h2>JobSearch</h2>
            <h3>Signup</h3>
            <div className='name'>
                    <FontAwesomeIcon icon={faUser} className="icon-name" /> 
                    <input className='input-name' ref={name} placeholder="Name" type="name"/>
                </div>
                <div className='email'>
                    <FontAwesomeIcon icon={faEnvelope} className="icon-user" /> 
                    <input className='input-email' ref={email} placeholder="Email" type="email"/>
                </div>
            <div className='password'>
            <FontAwesomeIcon icon={faLock} className="icon-lock" />
                <input className='input-password' ref={password} placeholder="Password" type="password"/>
            </div>
            <div className='role'>
                    <FontAwesomeIcon icon={faUserTag} className="icon-role" /> 
                    <select ref={role} defaultValue="applicant">
                      <option value="applicant" >Applicant</option>
                      <option value="employer" >Employer</option>
          </select>
                </div>

            <button className='btn-login'>Signup</button>
            <p>Already have an account? </p>
            <div className='btn-clickHere'><Link className='btn-signup' to="/login">Log In</Link></div>
          </div>
      </form>

    {error.loading&&<p>Cargando... Espere</p>}
    {error.isError&&<p>{error.message}</p>}


  </div>
)
}

