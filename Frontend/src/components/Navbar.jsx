import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../Context/AuthContext'
import {FaBars, FaTimes} from "react-icons/fa"
import LogOut from './LogOut'

export default function Navbar() {

    const {auth} = useContext(authContext)

    const [open, setOpen]=useState(false)

  return (
    <nav className='shadow-md w-full sticky top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center text-gray-800'>
      <h3 className='text 3xl text-indigo-600 mr-1 pt-2'><Link to="/">Job Search</Link></h3>
      </div>
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      {open ? <FaTimes/> : <FaBars/>}
      </div>
    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-50 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16 opacity-100 bg-gradient-to-tl from-gray-100 to-gray-50' : 'top-[-490px]'}  opacity-100 `}>
      {
        !auth.logged?<>
           <li className='md:ml-8 text-xl md:my-0 my-7'> <Link className='text-gray-800 hover:text-gray-400 duration-500 ' to="/login" >Login</Link></li>
           <li className='md:ml-8 text-xl md:my-0 my-7'> <Link className='bg-green-700 text-white py-2 px-6 rounded md:ml-8 hover:bg-green-600 duration-500 ' to="/signup">SignUp</Link></li>
        </>:
        <>
           <li className='md:ml-8 text-xl md:my-0 my-7'> <Link className='text-gray-800 hover:text-gray-400 duration-500 ' to="/jobs" >Jobs</Link></li>
           <li className='md:ml-8 text-xl md:my-0 my-7'> <Link className='text-gray-800 hover:text-gray-400 duration-500 ' to="/postjob" >Post a Job</Link></li>
           <li className='md:ml-8 text-xl md:my-0 my-7'><Link className='text-gray-800 hover:text-gray-400 duration-500 ' to="/profile" >Hi! {auth.name}</Link></li>
           <li className='md:ml-8 text-xl md:my-0 my-7'><LogOut/></li>
        </>
      }

        
      </ul>
      </div>
    </nav>
  )
}
