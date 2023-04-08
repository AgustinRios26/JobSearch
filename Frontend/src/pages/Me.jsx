import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { postWithToken } from '../api';
import {FaMapMarkerAlt, FaTags} from 'react-icons/fa'


export default function Me() {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    postWithToken("/api/jobs/me",{
    })
    .then(({data})=>{
      for (let i = 0; i < data.length; i++) {
        setJobs(data)
      }
    })
    .catch(error=>{
      console.log(error.response.data);
    })
  };

  useEffect(() => {
    getJobs();
  }, []);


  return (
    <main>
        <h2 className="text-center mt-6 text-3xl font-bold pb-5 border-b-4 border-gray-200">Mis postulaciones</h2>
        <div className='grid grid-flow-row grid-cols-1 px-4  md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10 bg-gray-100' > 
 {jobs.map(job => (
   <div className='grid justify-center	px-9 py-4 shadow-xl rounded-lg bg-white' key={job._id}>
     <h3 className='grid mb-2 text-2xl font-bold capitalize justify-center pt-4 pb-2 text-center'> {job.title} </h3>  
     <p className='font-serif italic text-md mt-3 my-6 first-letter:uppercase'> {job.description} </p>
     <p className="flex text-md capitalize my-2"><FaTags className="mt-1 mr-3 text-xl text-gray-600" />{job.category} </p>
     <p className='flex text-md capitalize my-2 mb-6'> <FaMapMarkerAlt className="mt-1 mr-3 text-xl text-gray-600" />{job.location.city}, {job.location.province}, {job.location.country} </p>
     <div><Link className='flex w-full justify-center px-4 py-3 bg-sky-900 hover:bg-pink-800 text-center text-lg text-white rounded duration-300' to={`/jobs/${job._id}`}>See more</Link></div>
   </div>
 ))}
 </div>
 </main>
      
  );
};