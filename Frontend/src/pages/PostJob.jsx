import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { postWithToken } from '../api';
import { authContext } from '../Context/AuthContext';
import swal from 'sweetalert';
import "../styles/postJob.css"

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
      swal({
        title:"Job Created!",
        icon:"success"
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
        console.log(data)
        console.log(data.data)
        console.log(auth)
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
    <div>
         <form className='form' onSubmit={postJob}>
        <div className='items-form'>
        <h2>Post a Job!</h2>
          <p>Title</p>
          <input ref={title} name="title" placeholder="Title" required/>
          <p>Description</p>
          <textarea ref={description} cols="60" rows="12" required></textarea>
          <p>Category</p>
          <select ref={category} defaultValue="Frontend">
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
          <p>Location</p>
          <input ref={country} name="country" placeholder="Country" required/>
          <div>
          <input ref={province} name="province" placeholder="Province" />
          <input ref={city} name="city" placeholder="City" /></div>
          <p>Salary</p>
          <input ref={salary} type="number" name="Salary" placeholder="100.000" min="0"/>

          <button className='btn-create'>Create Job!</button>
          </div>
      </form>


    </div>
  )
}
