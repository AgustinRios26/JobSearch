import React, {useContext, useRef} from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../Context/AuthContext'
import {FaBars, FaTimes} from "react-icons/fa"
import LogOut from './LogOut'
import "../styles/header.css"

export default function Navbar() {

    const context = useContext(authContext)

    const navRef = useRef();

    const showNavbar = () => {
      navRef.current.classList.toggle("responsive_nav")
    }

    // const {theme, toggleTheme} = useContext(themeContext);

  return (
    <header>
      <h3><Link to="/">Job Search</Link></h3>
    <nav ref={navRef} >
         {console.log("Render...")}
         {/* <button className='btn' onClick={toggleTheme} >{theme}</button> */}
        
           <div> <Link to="/jobs" onClick={showNavbar}>Jobs</Link></div>
           <div> {!context.auth.logged&&<Link to="/login" onClick={showNavbar} >Login</Link>}</div>
           <div> {!context.auth.logged&&<Link to="/signup" onClick={showNavbar}>SignUp</Link>}</div>
           <div> {context.auth.logged&&<Link to="/postjob" className='hi' onClick={showNavbar}>Post a Job</Link>}</div>
           <div> {context.auth.logged&&<Link to="/me" className='hi' onClick={showNavbar}>Hi! {context.auth.name}</Link>}</div>
           <div> {context.auth.logged&&<LogOut/>}</div>
        
        <button className='nav-btn nav-close-btn'  onClick={showNavbar} >
          <FaTimes/>
        </button>
    </nav>
    <button className='nav-btn' onClick={showNavbar}>
          <FaBars/>
        </button>
    </header>
  )
}
