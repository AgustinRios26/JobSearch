const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

const verifyToken = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) return res.status(401).json({ error: true, message: 'No token provider' })

    const [, token] = bearer.split(' ')

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        return next()
    } catch (error) {
        return res.status(401).json({ failed: true, error })
    }
}

function authValidation(req,res,next){
    const bearer = req.headers.authorization

    if (
        bearer &&
        bearer.startsWith('Bearer')
    ){
        // const split = bearer.split("Bearer ")

        // const token = split[1]
        const [,token] = bearer.split("Bearer ") //Realizando la destructuracion

        if(token){
            try{
                const decoded = jwt.verify(token,jwtSecret)

               // console.log(decoded)

                req.user = decoded

                return next()
 
            }catch({message,name}){
                // const message = error.message
                // const name = error.name
                return res.status(403).json({
                    error:true,
                    message,
                    type:name
                })
            }
            
        }
    }

    

    return res.status(403).json({
        error:true,
        message:"Insufficient permissions"
    })
}

function adminValidation(req,res,next){
    if(req.user.role==="admin"){
        return next()
    }else{
        return res.status(403).json({
            error:true,
            message:"Insufficient permissions"
        })
    }
}
function applicantValidation(req,res,next){
    if(req.user.role==="applicant"){
        return next()
    }else{
        return res.status(403).json({
            error:true,
            message:"Insufficient permissions"
        })
    }
}
function employerValidation(req,res,next){
    if(req.user.role==="employer"){
        return next()
    }else{
        return res.status(403).json({
            error:true,
            message:"Insufficient permissions"
        })
    }
}
function employerAdminValidation(req,res,next){
    if(req.user.role==="employer" || req.user.role==="admin"){
        return next()
    }else{
        return res.status(403).json({
            error:true,
            message:"Insufficient permissions"
        })
    }
}
function applicantAdminValidation(req,res,next){
    if(req.user.role==="applicant" || req.user.role==="admin"){
        return next()
    }else{
        return res.status(403).json({
            error:true,
            message:"Insufficient permissions"
        })
    }
}
function applicantEmployerAdminValidation(req, res, next){
    if(req.user.role === "employer" || req.user.role === "admin" || req.user.role === "applicant"){
        return next()
    } else{
        return res.status(403).json({
            error: true,
            message: "Permission denied"
        })
    }
}

function authMiddleware(type){
    let middlewares
    if(type==="employer"){
        middlewares=[authValidation,employerValidation]
    }else if(type==="employer-admin"){
        middlewares=[authValidation,employerAdminValidation]
    }else if(type==="applicant"){
        middlewares=[authValidation,applicantValidation]
    }else if(type==="applicant-admin"){
        middlewares=[authValidation,applicantAdminValidation]
    }else  if(type==="admin"){
        middlewares=[authValidation,adminValidation]
    }else if(type==="applicant-employer-admin"){
        middlewares=[authValidation,applicantEmployerAdminValidation]
    }else{
        middlewares=[]
    }
    return middlewares
}


module.exports = {authMiddleware,verifyToken}