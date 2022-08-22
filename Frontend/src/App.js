import { useContext, useEffect } from 'react';
import {Route,Routes,useLocation} from 'react-router-dom'
import Navbar from './components/Navbar';
import Details from './pages/Details';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Props from './pages/Props';
import SignUp from './pages/SignUp';
// import { themeContext } from './Context/Theme';
import { authContext } from './Context/AuthContext';
import { postWithToken } from './api';
import Jobs from './pages/Jobs';
import Job from './pages/Job';
import PostJob from './pages/PostJob';
import Employer from './pages/Employer'
import Me from './pages/Me';
import Profile from './pages/Profile';


export default function App() {

  // const {theme, toggleTheme} = useContext(themeContext);

  const context = useContext(authContext)
  
  
  useEffect(()=>{
    postWithToken("/api/auth/validate")
    .then(({data})=>{
      if(data.failed){
        console.log(data)
      }else{
        context.setAuth({
          id:data.user.id,
          name:data.user.name,
          role:data.user.role,
          logged:true
        })
      }
    })
  },[])



  return (
    <>

      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/details/:id' element={<Details/>}/>
        <Route path='/props' element={<Props/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/jobs/:id' element={<Job/>}/>
        <Route path='/me' element={<Me/>}/>
        <Route path='/employer' element={<Employer/>}/>
        <Route path='/postjob' element={<PostJob/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}