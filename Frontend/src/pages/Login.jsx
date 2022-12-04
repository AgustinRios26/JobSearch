import React, {useContext, useRef} from 'react'
import { authContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../api'
import loginImg from '../resources/img-login.jpg'


export default function Login() {

    const context = useContext(authContext);
    const navigate = useNavigate()

    const email = useRef()
    const password = useRef()

    // login de usuarios
    const login = (event)=>{
        event.preventDefault()

        post("/api/auth/login",{ // Peticion de login
            email: email.current.value,
            password:password.current.value
        })
        
    .then(data=>{
        const {token,user} = data.data
        localStorage.setItem("token",token) // Guardamos el token que recibimos
        context.setAuth({
            id:user.id,
            name:user.name,
            email: user.email,
            role: user.role,
            logged:true
        })
        navigate("/",{
            replace:true
        })
    })

}
  return (
    <main className="h-screen -mt-20 z-[-1]">
  <div className="container px-6 py-12 h-full">
    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div className="max-w-[600px] md:w-8/12 lg:w-6/12 mb-8 md:mb-0 hidden lg:block">
        <img src={loginImg} className="w-screen" alt="Login Img"/>
      </div>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20 outline outline-2 outline-gray-200 md:p-8 shadow-2xl p-10 bg-white">

        <form onSubmit={login}>
            <div className='mb-6' >
            <h3 className='flex justify-center items-center mb-6 text-3xl font-semibold'>Login</h3>
                <input className='form-control block w-full px-4 py-2 text-xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' ref={email} placeholder="Email" type="email"/>
             
            </div>
            <div className='mb-6'>
                <input className='form-control block w-full px-4 py-2 text-xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' ref={password} placeholder="Password" type="password"/>
            </div>

            <button className="inline-block px-7 py-3 mb-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">Login</button>
            <p className='mb-4 text-lg text-center'>Don't have an Account? </p>
            <div className='inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center'><Link to="/signup">Click Here!</Link></div>
        </form>
        </div>
        </div>
    </div>
    </main>
  )
}