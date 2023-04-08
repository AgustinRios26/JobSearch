import React, {useContext, useRef, useState} from 'react'
import { post } from '../api'
import { authContext } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Errors from '../components/Errors'
import useInput from '../hooks/useInput'
import signupImg from '../resources/img-signup.png'


export default function SignUp() {
  const context = useContext(authContext)
  const [errors,setErrors] = useState({
    isErrors:false,
    errors:[]
})
  const navigate = useNavigate()
  const role = useRef()

  const name = useInput("name","")
  const email = useInput("email","")
  const password = useInput("password","")


  const signup = (event) =>{
    event.preventDefault()
    post("/api/auth/signup",{
      name:name.value,
      email: email.value,
      password:password.value,
      role:role.current.value
    })
    .then(({data})=>{
      console.log(data.errors)
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
      setErrors({
        isErrors:true,
        errors:error.errors.map(e=>e.message)
      })
    })
  }


return (
  <main className="h-screen -mt-10 z-[-1]">
  <div className="container px-6 py-12 h-full">
    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div className="max-w-[680px] md:w-8/12 lg:w-6/12 mb-8 md:mb-0 hidden lg:block">
        <img src={signupImg} className="w-screen" alt="Signup Img"/>
      </div>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20 outline outline-2 outline-gray-200 md:p-8 shadow-2xl p-10 bg-white">
      <form onSubmit={signup}>
      <div className='mb-6' >
            <h2 className="flex justify-center items-center mb-6 text-3xl font-semibold" >Signup</h2>
                    <input className='form-control block w-full px-4 py-2 text-xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' placeholder="Name" type="name" {...name}/>
                </div>
                <div className='mb-6 '>
                    <input className='form-control block w-full px-4 py-2 text-xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' placeholder="Email" type="email" {...email}/>
                </div>
            <div className='mb-6'>
                <input className='form-control block w-full px-4 py-2 text-xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' placeholder="Password" type="password" {...password}/>
            </div>
            <div className='mb-6'>
                    <span className='block mb-2 text-sm font-medium text-gray-900'>Select an Role</span>
                    <select ref={role} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' defaultValue="applicant">
                      <option value="applicant" >Applicant</option>
                      <option value="employer" >Employer</option>
          </select>
                </div>

            <button className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mb-4'>Signup</button>
            <Errors errors={errors}/>
            <p className='mb-4 text-lg text-center'>Already have an account? </p>
            <div className='inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-4'><Link to="/login">Log In</Link></div>
      </form>
    </div>
    
    </div>
  </div>
</main>
)
}

