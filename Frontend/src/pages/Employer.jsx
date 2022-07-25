import React, { useState, useEffect } from "react";
import { postWithToken } from '../api';
import "../styles/jobs.css"

export default function Employer() {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    postWithToken("/api/jobs/employer",{
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
    <main className='main-jobs' >
        <p>Mis empleos</p>
    <div className='cards-jobs' > 
 {jobs.map(job => (
   <div className='job' key={job._id}>
     <h3> {job.title} </h3>
     <p> {job.description} </p>
     <p> {job.category} </p>
     <p> {job.location.country} </p>
   </div>
 ))}
 </div>
 </main>
      
  );
};