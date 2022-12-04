import React, { useState, useEffect } from "react";
import { postWithToken, deleteWithToken } from '../api';
import { FaMapMarkerAlt, FaTags, FaTimes} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Employer() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate()
  const alertJob=()=>{
    Swal.fire({
      icon: 'success',
      title: 'Deleted',
      text: "Job deleted Succesfully",
      showConfirmButton: false,
      timer: 2000
    })
  }

  const getJobs = async () => {
    postWithToken("/api/jobs/employer",{
    })
    .then(({data})=>{
      for (let i = 0; i < data.length; i++) {
        setJobs(data)
      }

      if (data.length == 0){
        setJobs(data)
        navigate(0)
      }
    })
    .catch(error=>{
      console.log(error);
    })
  };


  const deleteJob = async (id) => {
    deleteWithToken(`/api/jobs/${id}`,{
    })
    .then((data)=>{
      alertJob()
      getJobs()
      navigate(0)
    })
    .catch(error=>{
      console.log(error)
    })
  } 

  useEffect(() => {
    getJobs();
  }, []);


  return (
    <main>
        <h2 className="text-center mt-6 text-3xl font-bold pb-5 border-b-4 border-gray-200">Mis empleos</h2>
    {(jobs.length !== 0)&&<div className='grid grid-flow-row grid-cols-1 px-4  md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10 bg-gray-100' >
      
        {jobs.map(job => (
   <div className='grid justify-center	px-9 py-4 shadow-xl rounded-lg bg-white' key={job._id}>
    <button onClick={()=> deleteJob(job._id)} className='flex justify-end'><FaTimes className="text-3xl border-2 border-red-800 p-1 duration-500 rounded  hover:bg-red-700 hover:text-white"/> </button>
     <h3 className='grid mb-2 text-2xl font-bold capitalize justify-center pt-4 pb-2 text-center'> {job.title} </h3>
     <p className='font-serif italic text-md mt-3 my-6 first-letter:uppercase'> {job.description} </p>
     <p className="flex text-md capitalize my-2"><FaTags className="mt-1 mr-3 text-xl text-gray-600" /> {job.category} </p>
     <p className='flex text-md capitalize my-2 mb-6'> <FaMapMarkerAlt className="mt-1 mr-3 text-xl text-gray-600" />{job.location.city}, {job.location.province}, {job.location.country} </p>
     <div><Link className='flex w-full justify-center px-4 py-3 bg-sky-900 hover:bg-pink-800 text-center text-lg text-white rounded duration-300' to={`/jobs/${job._id}`}>See more</Link></div>
   </div> 
   
 
 ))}
  </div>}
      
      {(jobs.length===0) && <div className="grid grid-cols-1 bg-gray-100 text-gray-800"><div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
		<h3 className="text-4xl font-bold leading-none sm:text-5xl">No jobs published</h3>
		<p className="px-8 mt-8 mb-12 text-lg">Do you want to hire employees?</p>
		<div className="flex flex-wrap justify-center">
			<Link className="px-8 py-3 m-2 text-lg font-semibold rounded bg-violet-600 text-gray-50" to={`/postjob`} >Get started</Link>
			
		</div>
	</div></div>
}
 </main>
      
  );
};