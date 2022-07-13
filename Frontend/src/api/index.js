import axios from 'axios'

const url = "http://localhost:4000"

const instance = axios.create({
    baseURL:url
})

const post = (url,data)=>{
    return instance.post(url,data)
}
// const get = (url,data)=>{
//     return instance.get(url,data)
// }
const getWithToken = async (url)=>{
    const token = localStorage.getItem("token")
    if(token){
        console.log(token)
        console.log(instance)
        return await instance.get(url,{
            headers:{
                'Authorization':"Bearer "+localStorage.getItem("token")
            }
        })
    }

    return {
        data:{
            failed:true,
            message:"No tienes token"
        }
    }

}

const postWithToken = async (url,data)=>{
    const token = localStorage.getItem("token")
    if(token){
        return await instance.post(url,data,{
            headers:{
                'Authorization':"Bearer "+localStorage.getItem("token")
            }
        })
    }

    return {
        data:{
            failed:true,
            message:"No tienes token"
        }
    }

}

const putWithToken = async (url,data)=>{
    const token = localStorage.getItem("token")
    if(token){
        return await instance.put(url,data,{
            headers:{
                'Authorization':"Bearer "+localStorage.getItem("token")
            }
        })
    }

    return {
        data:{
            failed:true,
            message:"No tienes token"
        }
    }
}
const deleteWithToken = async (url,data) =>{
    const token = localStorage.getItem("token")
    if(token){
        console.log(deleteWithToken)
        return await instance.delete(url,data,{
            headers:{
                'Authorization':"Bearer "+localStorage.getItem("token")
            }
        })
    }

    return {
        data:{
            failed:true,
            message:"No tienes token"
        }
    }
    
}




export default instance

export {post, postWithToken, putWithToken, deleteWithToken, getWithToken} 