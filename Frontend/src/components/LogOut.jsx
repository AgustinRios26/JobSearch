import React, { useContext } from 'react'
import { authContext } from '../Context/AuthContext'

export default function LogOut() {
    const context = useContext(authContext)

    const handleLogOut=()=>{
        localStorage.removeItem("token")
        context.setAuth({
            logged:false,
            name:"",
            id:""
        })
        
    }
    return (
        <a className='rounded-lg px-5 py-2.5 text-center mr-2 mb-2 transition-all ease-in duration-150 duration text-white text-xl bg-red-800 focus:ring-4 focus:outline-none border border-red-700 hover:bg-red-700' onClick={handleLogOut} href="/">
            Sign Out
        </a>
    )
}