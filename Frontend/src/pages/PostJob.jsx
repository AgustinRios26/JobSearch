import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { postWithToken } from '../api';
import { authContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

export default function PostJob() {
     const {auth} = useContext(authContext)
     const navigate = useNavigate()
     
    const title = useRef()
    const description = useRef()
    const category = useRef()
    const country = useRef()
    const province = useRef()
    const city = useRef()
    const salary = useRef()
    const alertJob=()=>{
      Swal.fire({
        title:"Job Created!",
        icon:"success",
        showConfirmButton: false,
        timer:3000
      })
    }
  
    const postJob = (event) =>{
      event.preventDefault()
      postWithToken("/api/jobs",{
        employer:{
          id:auth.id,
          name:auth.name,
          email: auth.email,
          role: auth.role,
        },
         title:title.current.value,
         description:description.current.value,
         category: category.current.value.split(", "),
         location: {
          country: country.current.value,
          province: province.current.value,
          city: city.current.value
      },
      salary: salary.current.value
      })
      .then(data=>{
        alertJob()
        navigate("/employer",{
          replace:true
      })
      })
      .catch(error=>{
        console.log(error.response.data);
      })
  
  
    }
  return (
    <div className=' bg-gradient-to-tr from-stone-100 to-gray-100'>
         <form className='flex justify-center p-6' onSubmit={postJob}>
        <div className='flex flex-col border-4 py-6 px-8 border-gray-200 shadow-xl min-w-[200px] shadow-sky-200 bg-white rounded-lg'>
        
        <h2 className='text-center text-2xl font-bold leading-none sm:text-3xl text-gray-700 mb-5'>Post a Job!</h2>
          <label className='mb-2 text-md font-medium text-gray-900'>Title</label>
          <input ref={title} className='w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' name="title" placeholder="Title" required/>
          <label className='mb-2 text-md font-medium text-gray-900'>Description</label>
          <textarea ref={description} className='w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' cols="60" rows="12" required></textarea>
          <label className='mb-2 text-md font-medium text-gray-900'>Category</label>
          <select className='w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' ref={category} defaultValue="Frontend">
                      <option value="Backend" >Backend</option>
                      <option value="Database" >Database</option>
                      <option value="Data Analyst" >Data Analyst</option>
                      <option value="DevOps" >DevOps</option>
                      <option value="Frontend" >Frontend</option>
                      <option value="FullStack" >FullStack</option>
                      <option value="Game Developer" >Game Developer</option>
                      <option value="Mobile Development" >Mobile Development</option>
                      <option value="UX / UI" >UX / UI</option>
          </select>
          <label className='mb-2 text-md font-medium text-gray-900'>Location</label>
          <label className='mb-2 text-sm font-medium text-gray-900'>Country</label>
          <select className='w-full px-3 py-1.5 mb-4 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' ref={country} defaultValue="Argentina">
              <option value="Remote" >Remote</option>
              <option value="Argentina" >Argentina</option>
              <option value="France" >France</option>
              <option value="Germany" >Germany</option>
              <option value="Spain" >Spain</option>
              <option value="United States" >Unites States</option>
              <option value="UK" >UK</option>
              <option value="Other" >Other</option>
          </select>
          <div className='flex'>
          <input ref={province} className='w-1/2 mr-4 px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none capitalize' name="province" placeholder="Province" />
          <input ref={city} className='w-1/2 ml-4 px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none capitalize' name="city" placeholder="City" /></div>
          <label className='mb-2 text-md font-medium text-gray-900'>Salary (per month)</label>
          <div className='flex'>
            <p className='flex items-center px-3 py-1.5 mb-2 text-xl md:text-xl bg-indigo-200 pointer-events-none sm:text-sm rounded-l-md'>$</p>
            <input ref={salary} className=' w-1/4 px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-indigo-200 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' type="number" name="Salary" placeholder="100.000" min="0"/>
          </div>

          <button className='flex w-full justify-center mt-5 px-4 py-3 bg-sky-900 hover:bg-pink-800 text-center text-lg text-white rounded duration-300'>Create Job!</button>
          </div>
      </form>
    </div>
  )
}
