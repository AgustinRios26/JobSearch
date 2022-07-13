import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { putWithToken } from '../api'
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
  return (
    <main>
        <video src={videoFondo} type="video/mp4" autoPlay loop muted/>
      <div className='main-content'> 
       <h1>Welcome to JobSearch</h1>
        <p>Discover the Best Jobs and connect with companies<br/>
          or Post a Job!</p>
        </div>
        <div className='home-links' >
          <p>Do you have a Account?</p>
        <Link className='btn-link' to="/login">Click Here!</Link>
        <p>New to JobSearch?</p>
        <Link className='btn-link' to="/signup">Join Now!</Link>
        </div>

        <input ref={empleo} placeholder='id empleo' />
        <button onClick={aplicar} >Aplicar</button>

        <Link to="/details/:id">Ir a componente</Link>
        <Link to="/props" state={{
          name:"Tzuzul",
          id:"abc123",
          active:true
        }}>Ir a componente con props</Link>
    </main>
  )
}
