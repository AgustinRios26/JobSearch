const {mongoose} = require("../config/db")

const Schema = mongoose.Schema


const userSchema = new Schema({
    name:{
        type: String, 
        required:true
    },
    email:{
        type:String,
        lowercase: true,
        unique:true,
        required:true
    },
    password:{type: String, 
        required:true
    },
    role:{
        type:String,
        enum:["applicant","employer","admin"],
        required:true,
    }
    
})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel