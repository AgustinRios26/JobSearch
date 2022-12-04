import { useContext, useEffect } from 'react';
import {Route,Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import { authContext } from './Context/AuthContext';
import { postWithToken } from './api';
import Jobs from './pages/Jobs';
import Job from './pages/Job';
import PostJob from './pages/PostJob';
import Employer from './pages/Employer'
import Me from './pages/Me';
import Profile from './pages/Profile';
import Footer from './components/Footer';


export default function App() {
  const context = useContext(authContext)
  
  
  useEffect(()=>{
    postWithToken("/api/auth/validate")
    .then(({data})=>{
      if(data.failed){
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
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/jobs/:id' element={<Job/>}/>
        <Route path='/me' element={<Me/>}/>
        <Route path='/employer' element={<Employer/>}/>
        <Route path='/postjob' element={<PostJob/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </>
  );
}