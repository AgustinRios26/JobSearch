import React, {useContext, useRef} from 'react'
import { authContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { post } from '../api'

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
        {/* {console.log(context)} */}
        <h1>Login</h1>
        <form onSubmit={login}>
            <input ref={email} placeholder="Email" type="email"/>
            <input ref={password} placeholder="password" type="password"/>

            <button>Login</button>
        </form>
    </div>
  )
}
