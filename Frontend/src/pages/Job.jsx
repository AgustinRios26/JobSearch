import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaDollarSign, FaMapMarkerAlt, FaTags } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'
import { getWithToken, putWithToken } from '../api';
import Swal from 'sweetalert2'

export default function Job() {
    const {id} = useParams();
    const [oneJob, setOneJob] = useState([]);


    useEffect(() => {
      getWithToken(`/api/jobs/${id}`,{
      })
      .then(({data})=>{
         setOneJob(data)
      })
      .catch(error=>{
        console.log(error.response.data);
      })
    }, []);

    const apply = ()=>{
        putWithToken(`api/jobs/apply/${id}`) 
    
        .then(({data})=>{
            
            if(data.errors){
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'You have already applied',
                timer: 2500
              })
            } else {
              setOneJob(data)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'You applied successfully',
              showConfirmButton: false,
              timer: 1500
            })
            }
         })
         .catch(({data})=>{
           console.log(data.response.data);
         })
       }

       const unapply = ()=>{
    
        putWithToken(`api/jobs/unapply/${id}`) 
      
        .then(({data})=>{
            
            if(data.errors){
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "You didn't have applied",
                timer: 2500
              })
            } else {
              setOneJob(data)
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'You unapplied successfully',
                showConfirmButton: false,
                timer: 1500
              })
            }
         })
         .catch(error=>{
           console.log(error.response.data);
         })
       }

    const options =  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className='px-16 pt-6 mx-auto bg-gradient-to-b from-teal-50 to-gray-50'>
      <button><Link className='flex mb-5 w-full justify- px-4 py-3 bg-teal-600 hover:bg-teal-500 text-center text-lg text-white rounded duration-300' to="/jobs"><FaArrowLeft className="mt-1 mr-5 text-xl " />Back</Link></button>
    <div className='flex flex-col items-center justify-center -mt-4 p-8 bg-gradient-to-b from-teal-50 to-gray-50'>
      <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 fill-current text-gray-700" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M0 3.75A.75.75 0 01.75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.496 4.496 0 0115.75 3h7.5a.75.75 0 01.75.75v15.063a.75.75 0 01-.755.75l-7.682-.052a3 3 0 00-2.142.878l-.89.891a.75.75 0 01-1.061 0l-.902-.901a3 3 0 00-2.121-.879H.75a.75.75 0 01-.75-.75v-15zm11.247 3.747a3 3 0 00-3-2.997H1.5V18h6.947a4.5 4.5 0 012.803.98l-.003-11.483zm1.503 11.485V7.5a3 3 0 013-3h6.75v13.558l-6.927-.047a4.5 4.5 0 00-2.823.971z"></path></svg>
  </div>
      <div className='mt-8 text-center'>
        <p className='mx-auto lg:w-1/2 text-gray-500 font-light'>Posted: {new Date(oneJob.creationDate).toLocaleDateString(undefined, options)}</p>
        <h2 className='text-4xl mt-6 capitalize font-semibold'>{oneJob.title}</h2>
        <article className='mx-auto mt-4 py-5 lg:w-1/2 text-gray-800 first-letter:uppercase border-b-2 border-gray-400 italic'>{oneJob.description}</article>
        <p className='flex text-center mx-auto mt-5 lg:w-1/2 text-gray-700 capitalize font-mono'><FaTags className="mt-1 mr-3 text-xl text-black"/> Category : {oneJob.category}</p>
        <p className='flex mx-auto mt-5 lg:w-1/2 text-gray-700 capitalize font-mono'><FaMapMarkerAlt className="mt-1 mr-3 text-xl text-black" />Location: {oneJob.location?.city}, {oneJob.location?.province}, {oneJob.location?.country} </p>
        <p className='flex text-left mx-auto mt-5 lg:w-1/2 text-gray-700 font-mono'><FaDollarSign className="mt-1 mr-3 text-xl text-black" /> Salary: ${oneJob.salary}</p>
        <p className='mx-auto mt-8 lg:w-1/2 text-gray-700 uppercase'>This work was created by {oneJob.employer?.name}</p>
        <p className='mx-auto mt-5 lg:w-1/2 text-gray-800 text-left'>Total applicants: {oneJob.applicants?.length}</p>
        </div>
        

        <div className='flex content-between'>
        <button className='mx-5 mt-8 block rounded-lg border border-sky-800 bg-sky-900 py-1.5 px-4 font-medium text-white transition-colors hover:bg-sky-700 hover:border-sky-600 active:bg-sky-600 disabled:opacity-50' onClick={apply} >Apply</button>
        <button className='mx-5 mt-8 block rounded-lg bg-red-800 py-1.5 px-4 font-medium text-white transition-colors hover:bg-red-700 active:bg-red-500 disabled:opacity-50' onClick={unapply} >Unapply</button>
        </div>
    </div>
    </div>
  )
}