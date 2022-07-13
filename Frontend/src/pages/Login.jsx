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
        
        // fetch("http://localhost:4000/api/auth/login",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //         email: email.current.value,
        //         password: password.current.value
        //     })
    //     .then(data=> {
    //         localStorage.setItem("token", data.token)
    //         context.setAuth({
    //             id:data.user.id,
    //             name:data.user.name,
    //             logged:true
    //         })
    //         fetch("http://localhost:4000/api/users",{
    //             headers:{
    //                 "Authorization":"Bearer "+localStorage.getItem("token")
    //             }
    //         })
    //         .then((response)=>{
    //             return response.json()
    //         })
    //         .then(data=>{
    //             console.log(data)
    //         })
    //     })
    //     .catch(error=>console.log(error))
    // }
    .then(data=>{
        const {token,user} = data.data
        localStorage.setItem("token",token) // Guardamos el token que recibimos
        context.setAuth({
            id:user.id,
            name:user.name,
            logged:true
        })
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
