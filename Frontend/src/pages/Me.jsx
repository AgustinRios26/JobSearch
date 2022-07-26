import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { postWithToken } from '../api';
import pinUbicacion from '../resources/pin-ubicacion.png'
import imgCategory from '../resources/category2.jpg'
import "../styles/jobs.css"


export default function Me() {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    postWithToken("/api/jobs/me",{
    })
    .then(({data})=>{
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        setJobs(data)
        console.log(data[i])
        
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
    <main className='main-jobs'>
        <p>Mis postulaciones</p>
        <div className='cards-jobs' > 
 {jobs.map(job => (
   <div className='job' key={job._id}>
     <h3> {job.title} </h3>  
     <p className='description'> {job.description} </p>
     <p className='category'><img src={imgCategory} />{job.category} </p>
     <p className='country'> <img src={pinUbicacion} /> {job.location.country} </p>
     <div><Link className='btn-job-link' to={`/jobs/${job._id}`}>See more</Link></div>
   </div>
 ))}
 </div>
 </main>
      
  );
};