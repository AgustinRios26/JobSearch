import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { postWithToken } from '../api';
import { authContext } from '../Context/AuthContext';

export default function PostJob() {
     const {auth} = useContext(authContext)
     const navigate = useNavigate()
     
    // const [error, setError] = useState({
    //   isError:false,
    //   message:"",
    //   loading:false
    // });
    const title = useRef()
    const description = useRef()
    const category = useRef()
    const country = useRef()
    const province = useRef()
    const city = useRef()
    const salary = useRef()
  
  
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
        alert("Empleo creado con éxito")
        navigate("/employer",{
          replace:true
      })
      })
      .catch(error=>{
        console.log(error.response.data);
        // setError({
        //   isError:true,
        //   message:error.response.data.message,
        //   loading:false
        // })
      })
  
  
    }
  return (
    <div>
        <h1>Post Job</h1>
         <form onSubmit={postJob}>
          <input ref={title} name="title" placeholder="Title" />
          <input ref={description} name="description" placeholder="description" />
          <input ref={category} name="category" placeholder="category" />
          <input ref={country} name="country" placeholder="Country" />
          <input ref={province} name="province" placeholder="province" />
          <input ref={city} name="city" placeholder="City" />
          <input ref={salary} name="salary" placeholder="salary" />

          <button>Create</button>
      </form>

    {/* {error.loading&&<p>Cargando... Espere</p>}
    {error.isError&&<p>{error.message}</p>} */}
    </div>
  )
}
