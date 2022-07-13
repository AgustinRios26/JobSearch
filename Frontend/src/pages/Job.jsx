import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getWithToken, putWithToken } from '../api';

export default function Job() {
    const {id} = useParams();
    
    console.log(id);
    const [oneJob, setOneJob] = useState([]);


    useEffect(() => {
      getWithToken(`/api/jobs/${id}`,{
      })
      .then(({data})=>{
         console.log(data)
         setOneJob(data)
      })
      .catch(error=>{
        console.log(error.response.data);
      })
    }, []);

    const apply = ()=>{
        putWithToken(`api/jobs/apply/${id}`) 
    
        .then(({data})=>{
            setOneJob(data)
            console.log(data)
            if(data.error){
                alert(data.message)
                window.location.reload(true);
            }
         })
         .catch(({data})=>{
            setOneJob(data)
           console.log(data.response.data);
         })
       }

       const unapply = ()=>{
    
        putWithToken(`api/jobs/unapply/${id}`) 
      
        .then(({data})=>{
            setOneJob(data)
            if(data.error){
                alert(data.message)
                window.location.reload(true);
            }
         })
         .catch(error=>{
           console.log(error.response.data);
         })
       }

  return (
    <div>
        <h2>{oneJob.title}</h2>
        <article>{oneJob.description}</article>
        <p>Category: {oneJob.category}</p>
        <p>Location: {oneJob.location?.city}, {oneJob.location?.province}, {oneJob.location?.country} </p>
        <p>Salary: {oneJob.salary}</p>
        <p>This work was created by {oneJob.employer?.name}</p>
        <p>Total applicants: {oneJob.applicants?.length}</p>
        <p>Posted: {new Date(oneJob.creationDate).toUTCString()}</p>
        


        <button onClick={apply} >Apply</button>
        <button onClick={unapply} >Unapply</button>
        {/* <p>{new Date(oneJob.creationDate).toISOString().split('T')[0]}</p> */}
    </div>
    
  )
}
