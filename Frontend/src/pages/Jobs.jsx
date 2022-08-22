import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { getWithToken, postWithToken } from '../api';
import pinUbicacion from '../resources/pin-ubicacion.png'
import imgCategory from '../resources/category2.jpg'
import "../styles/jobs.css"

export default function Jobs() {
  // const [error, setError] = useState({
  //   isError:false,
  //   message:"",
  //   loading:false
  // });
  const [jobs, setJobs] = useState([]);
  const searchText = useRef()
  const country = useRef()
  const province = useRef()
  const city = useRef()


    //Get All Jobs
    const getAllJobs = () => {
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
    }

const sendFilter = (event) => {
  event.preventDefault();
  console.log(country.current.value)
  if (searchText.current.value !== "") {
    postWithToken('/api/jobs/category',{
      category:searchText.current.value.split(", "),
    })
        .then( ({data})  => {
          console.log(data)
          for (let i = 0; i < data.length; i++) {
            setJobs(data)
            console.log(data[i])
            
          }
        })
        .catch(error => {
            console.log(error);
        })
  }
  if (country.current.value !=="" || province.current.value !=="" || city.current.value !=="" ) {
  
    event.preventDefault()
      postWithToken('/api/jobs/location',{
      
        country: country.current.value,
        province: province.current.value,
        city: city.current.value
    
  })
          .then( ({data}) => {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
              setJobs(data)
              console.log(data[i])
              
            }
          })
          .catch(error => {
              console.log(error);
          })
  }
}
 
  useEffect(() => {
  getAllJobs();
  }, []);

  return (
    <main className='main-jobs'>
    <section className='filters'>
      <h3>Filters</h3>
      <form className='form-filters' onSubmit={sendFilter}>
      <input ref={searchText} name="InputText" placeholder="Name" />
      <input ref={country} name="InputText" placeholder="Country" />
      <input ref={province} name="province" placeholder="Province" />
      <input ref={city} name="city" placeholder="City" />
      <button>Search</button>
      <div className='btn-reset'>
      <button className='button-reset' onClick={getAllJobs} >Reset Filters</button></div>
      </form>

    </section>
 {/* <button onClick={loadJobs}>Recuperar trabajos</button> */}
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

  )
}