import React, { useContext, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { postWithToken } from '../api';
import { authContext } from '../Context/AuthContext';

export default function PostJob() {
     const context = useContext(authContext)

     
    // const [error, setError] = useState({
    //   isError:false,
    //   message:"",
    //   loading:false
    // });
    const title = useRef()
    const email = useRef()
    const password = useRef()
    const role = useRef()
  
  
    const postJob = (event) =>{
      event.preventDefault()
    //   console.log(role.current.value);
    //   setError({...error,loading:true})
      postWithToken("/api/jobs",{
         title:title.current.value,
        // email: email.current.value,
        // password:password.current.value,
        // role:role.current.value
      })
      .then(data=>{
        console.log(data)
        console.log(title.current.value)
        context.setAuth({
          ...context.auth,
          offers: [...context.auth.offers, postJob.data],
        })
        // // console.log(...context.auth)
        // // setError({...error,loading:false})
        // console.log(context)
        // console.log(context.setAuth)
        // console.log(context.id)
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
          {/* <select ref={role} defaultValue="applicant">
            <option value="applicant" >Applicant</option>
            <option value="employer" >Employer</option>
          </select> */}

          <button>SignUp</button>
      </form>

    {/* {error.loading&&<p>Cargando... Espere</p>}
    {error.isError&&<p>{error.message}</p>} */}
    </div>
  )
}
