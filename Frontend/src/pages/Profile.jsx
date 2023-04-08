import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { authContext } from "../Context/AuthContext";
import userIcon from "../resources/user-icon.jpg"


export default function Profile() {
    const {auth} = useContext(authContext);
    const admin = "admin"
    const applicant = "applicant"
    const employer = "employer"

  return (
    <main className='profile'>
        <h2 className="text-center mt-6 text-3xl font-bold pb-5 border-b-4">Hi {auth.name}!</h2>
        <div className="flex mt-4 justify-center mb-10 sm:mb-16">
          <div className="sm:w-1/2 justify-center flex">
          <img className='hidden my-auto sm:block object-cover w-auto max-h-[400px] object-center'src={userIcon} alt="img-home"/>
          </div>
          <div className=" sm:w-1/2 flex flex-col items-center ">
        
        {(auth.role === admin || auth.role === applicant) &&<p className="mt-4 px-6 py-2 text-2xl font-semibold text-center sm:font-bold sm:text-xl md:text-2xl lg:max-w-2xl xl:max-w-3xl justify-center text-gray-700">Do you want to see all the jobs that you applied?</p>}
        {(auth.role === admin || auth.role === applicant) &&<Link className=' flex w-full max-w-[200px] justify-center px-4 py-3 mt-4 bg-sky-900 hover:bg-pink-800 text-center text-lg text-white rounded duration-300' to="/me">Click Here</Link>}
        {(auth.role === admin || auth.role === employer) &&<p className="px-6 py-2 mt-4 text-2xl font-semibold text-center sm:font-bold sm:text-xl md:text-2xl lg:max-w-2xl xl:max-w-3xl justify-center text-gray-700">Do you want to see all the jobs that you created?</p>}
        {(auth.role === admin || auth.role === employer) &&<Link className='flex w-full max-w-[200px] justify-center px-4 py-3 mt-4 bg-sky-900 hover:bg-pink-800 text-center text-lg text-white rounded duration-300' to="/employer">Click Here</Link>}
        </div>
    </div>
 </main>
      
  );
};