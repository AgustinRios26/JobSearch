import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { getWithToken, postWithToken } from '../api';
import { authContext } from '../Context/AuthContext';
import "../styles/jobs.css"

export default function Jobs() {
  const context = useContext(authContext)
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  // const [error, setError] = useState({
  //   isError:false,
  //   message:"",
  //   loading:false
  // });
  const [jobs, setJobs] = useState([]);


  useEffect(() => {
    getWithToken("/api/jobs",{
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
  }, []);


  return (
    <main className='main-jobs'>Jobs
 {/* <button onClick={loadJobs}>Recuperar trabajos</button> */}
 <div className='jobs' > 
 {jobs.map(job => (
   <div className='job' key={job._id}>
     <h3> {job.title} </h3>
     <p> {job.description} </p>
     <p> {job.category} </p>
     <p> {job.location.country} </p>
     <Link to={`/jobs/${job._id}`}>See more</Link>
   </div>
 ))}
 </div>
    </main>

  )
}
