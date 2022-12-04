import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { getWithToken, postWithToken } from '../api';
import {FaMapMarkerAlt, FaSortDown, FaTags} from 'react-icons/fa'

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
        for (let i = 0; i < data.length; i++) {
          setJobs(data)          
        }
      })
      .catch(error=>{
        console.log(error.response.data);
      })
    }

const sendFilter = (event) => {
  event.preventDefault();
  if (searchText.current.value !== "") {
    postWithToken('/api/jobs/category',{
      category:searchText.current.value.split(", "),
    })
        .then( ({data})  => {
          for (let i = 0; i < data.length; i++) {
            setJobs(data)            
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
            for (let i = 0; i < data.length; i++) {
              setJobs(data)              
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

  const [open, setOpen]=useState(false)

  return (
    <main className='main-jobs'>
    <section className='flex flex-col'>
      <div  onClick={()=>setOpen(!open)} className='flex cursor-pointer mt-5'>
      <h3  className='text-2xl font-bold mb-4 text-stone-600 ml-5'>Filters</h3>
      <p className='text-2xl ml-1'><FaSortDown/></p> </div>
      <div   className={`bg-white p-6 rounded-xl shadow-lg ${open ? 'top-18 opacity-100' : 'hidden'} `}>
     
      <form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' onSubmit={sendFilter}>
      <div className='flex flex-col'>
      <label for="jobs" class="font-medium text-sm text-stone-600">Category</label>
      <select ref={searchText} className='mt-2 block w-full rounded-md outline-none border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50' defaultValue="">
                      <option value=""></option>
                      <option value="backend" >Backend</option>
                      <option value="database" >Database</option>
                      <option value="data analyst" >Data Analyst</option>
                      <option value="devops" >DevOps</option>
                      <option value="frontend" >Frontend</option>
                      <option value="fullstack" >FullStack</option>
                      <option value="game developer" >Game Developer</option>
                      <option value="mobile development" >Mobile Development</option>
                      <option value="ux / ui" >UX / UI</option>
      </select>
      </div>
      <div className='flex flex-col'>
      <label for="country" class="font-medium text-sm text-stone-600">Country</label>
      <select ref={country} className='mt-2 block w-full rounded-md outline-none border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50' defaultValue="">
              <option value=""></option>
              <option value="Remote" >Remote</option>
              <option value="Argentina" >Argentina</option>
              <option value="France" >France</option>
              <option value="Germany" >Germany</option>
              <option value="Spain" >Spain</option>
              <option value="United States" >Unites States</option>
              <option value="UK" >UK</option>
              <option value="Other" >Other</option>
      </select>
      </div>
      <div className='flex flex-col'>
      <label for="state" class="font-medium text-sm text-stone-600">State / Province</label>
      <input ref={province} className='mt-2 block w-full rounded-md outline-none border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 capitalize' name="province" placeholder="Cordoba"/>
      </div>
      <div className='flex flex-col'>
      <label for="city" class="font-medium text-sm text-stone-600">City</label>
      <input ref={city} className='mt-2 block w-full rounded-md outline-none border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 capitalize' name="city" placeholder="Cordoba" />
      <div className='grid md:flex grid-cols-2 justify-end space-x-4 w-full mt-6'>
      <button className='px-4 py-2 rounded-lg bg-stone-400 hover:bg-stone-500 font-bold text-white shadow-lg shadow-stone-200 transition ease-in-out duration-200 translate-10' onClick={getAllJobs} >Reset Filters</button>
      <button className='px-4 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition ease-in-out duration-200 translate-10'>Search</button>
      </div>
      </div>
      </form>
      </div>

    </section>
 <div className='grid grid-flow-row grid-cols-1 px-4  md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10 bg-gray-100' > 
 {jobs.map(job => (
   <div className='grid justify-center	px-9 py-4 shadow-xl rounded-lg bg-white' key={job._id}>
     <h3 className='grid mb-2 text-2xl font-bold capitalize justify-center pt-4 pb-2 text-center'> {job.title} </h3>  
     <p className='font-serif italic text-md mt-3 my-6 first-letter:uppercase'> {job.description} </p>
     <p className='flex text-md capitalize my-2'><FaTags className="mt-1 mr-3 text-xl text-gray-600" />{job.category[0]} </p>
     <p className='flex text-md capitalize my-2 mb-6'> <FaMapMarkerAlt className="mt-1 mr-3 text-xl text-gray-600" /> {job.location.city}, {job.location.province}, {job.location.country} </p>
     <div><Link className='flex w-full justify-center px-4 py-3 bg-sky-900 hover:bg-pink-800 text-center text-lg text-white rounded duration-300' to={`/jobs/${job._id}`}>See more</Link></div>
     {console.log(job)}
   </div>
 ))}
 </div>
    </main>

  )
}