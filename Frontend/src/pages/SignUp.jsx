import React, {useContext, useRef, useState} from 'react'
import { post } from '../api'
import { authContext } from '../Context/AuthContext'

export default function SignUp() {
  const context = useContext(authContext)
  const [error, setError] = useState({
    isError:false,
    message:"",
    loading:false
  });
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
        logged:true
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
      <h1>SignUp</h1>
      <form onSubmit={signup}>
          <input ref={name} placeholder="Name" />
          <input ref={email} placeholder="Email" type="email"/>
          <input ref={password} placeholder="password" type="password"/>
          <select ref={role} defaultValue="applicant">
            <option value="applicant" >Applicant</option>
            <option value="employer" >Employer</option>
          </select>

          <button>SignUp</button>
      </form>

    {error.loading&&<p>Cargando... Espere</p>}
    {error.isError&&<p>{error.message}</p>}


  </div>
)
}

