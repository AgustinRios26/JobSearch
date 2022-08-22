import React, { useContext,useRef } from 'react'
import { Link } from 'react-router-dom'
import { putWithToken } from '../api'
import { authContext } from '../Context/AuthContext'
import videoFondo from "../resources/video-fondo.mp4"

export default function Home() {
  const empleo = useRef()
  const aplicar = ()=>{
    //putWithToken("api/jobs/apply/"+empleo.current.value)
    putWithToken(`api/jobs/apply/${empleo.current.value}`) 
    //para unapply de ese empleo cambia nomas la ruta a unapply
    .then(result=>{
      console.log(result)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const applicant = "applicant"
  const employer = "employer"
  // const admin = "admin"

 const context = useContext(authContext);

  return (
    <main className='main-home' >
        <video src={videoFondo} type="video/mp4" autoPlay loop muted/>
      <div className='main-content'> 
       <h1>Welcome to JobSearch</h1>
        <p>Discover the Best Jobs and connect with companies<br/>
          or Post a Job!</p>
       
        <div className='home-links' >
          {!context.auth.logged&&
          <p>Do you have a Account?</p>}
        {!context.auth.logged&&<Link className='btn-link' to="/login">Click Here!</Link>}
        {!context.auth.logged&&<p>New to JobSearch?</p>}
        {!context.auth.logged&&<Link className='btn-link' to="/signup">Join Now!</Link>}
        {context.auth.role == applicant &&<p>Find a Job</p>}
        {context.auth.role == applicant&&<Link className='btn-link' to="/jobs">Find Now!</Link>}
        <p></p>
        {context.auth.role == employer&&<p>Find employees to hire!</p>}
        {context.auth.role == employer&&<Link className='btn-link' to="/postjob">Post a Job!</Link>}
        </div>
        </div>
    </main>
  )
}
