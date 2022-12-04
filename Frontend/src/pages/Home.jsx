import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../Context/AuthContext'
import imgHome from "../resources/image-home.webp"

export default function Home() {
  const applicant = "applicant"
  const employer = "employer"
  const admin = "admin"

 const {auth} = useContext(authContext);

  return (
    <main className='main-home z-[-1] ' >
      <div className='main-content'>
        <div className='img-home absolute md:block hidden'>
      <img className='object-cover max-h-[670px] w-screen'src={imgHome} alt="img-home"/>
      </div> 
        <div className='md:relative flex flex-col items-center pt-20 md:mb-32'>

       <h1 className='font-bold text-slate-100 text-6xl px-4 text-center '>Welcome to JobSearch</h1>
         
        <p className=' font-light pt-16 text-4xl text-white text-center px-4'>The Easiest Way to Get Your New Job</p>
        <p className='pt-4 text-2xl text-white font-extralight text-center px-4 mb-2'>Find Jobs, Employment & Career Opportunities</p>
       {!auth.logged?<>
        <div className='flex text-center items-center flex-col' >
          
          <p className='text-white m-5 text-lg'>Do you have an Account?</p>
        <Link className='rounded-lg px-5 py-2.5 text-center mr-2 mb-2 transition-all ease-in duration-75 text-white text-xl  bg-transparent hover: bg-white focus:ring-4 focus:outline-none border border-white hover:bg-white hover:text-red-800' to="/login">Click Here!</Link>
        <p className='text-white m-5 text-lg'>New to JobSearch?</p>
        <Link className='rounded-lg px-5 py-2.5 text-center mr-2 transition-all ease-in duration-150 duration text-white text-xl  bg-green-700 focus:ring-4 focus:outline-none border border-green-800 hover:bg-green-600 mb-10 md:mb-16' to="/signup">Join Now!</Link>
        </div>
       
       </>:
       <>
       {(auth.role === applicant || auth.role === admin) &&<p className='text-white m-5 text-lg' >Do you want a Job?</p>}
       {(auth.role === applicant || auth.role === admin) &&<Link className='rounded-lg px-5 py-2.5 text-center mr-2 mb-2 transition-all ease-in duration-75 text-white text-xl  bg-transparent hover: bg-white focus:ring-4 focus:outline-none border border-white hover:bg-white hover:text-red-800' to="/jobs">Find Now!</Link>}
       <p></p>
       {(auth.role === employer || auth.role === admin) &&<p className='text-white m-5 text-lg'>Find employees to hire!</p>}
       {(auth.role === employer || auth.role === admin) &&<Link className='rounded-lg px-5 py-2.5 text-center mr-2 transition-all ease-in duration-150 duration text-white text-xl  bg-green-700 focus:ring-4 focus:outline-none border border-green-800 hover:bg-green-600 mb-10 md:mb-16' to="/postjob">Post a Job!</Link>}
       </> }
        </div>
      </div>
    </main>
  )
}
