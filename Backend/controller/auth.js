const res = require("express/lib/response")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { jwtSecret } = require("../config")
const User = require("./users")

class Auth{
    async login(data){
        // const email = data.email
        // const password = data.password
        const {email,password} = data

        const userServ = new User()
        const user = await userServ.getByEmail(email)

        if(user && await this.#compare(password,user.password)){
            return this.#getUserData(user)
        }

        return {
            success:false,
            errors:["Wrong Credentials"]
        }

    }

    async signup(data){
        if(data.password){
            data.password = await this.#encrypt(data.password)
        }
        const userServ = new User()
        const user = await userServ.create(data)
        if(!user.created){
                return {
                    success:false,
                    errors:user.errors
                }
        }

        return this.#getUserData(user.user)

    }

    #getUserData(user){
        const userData = {
            name:user.name,
            email:user.email,
            role:user.role,
            id:user.id
        }

        const token = this.#createToken(userData)
        return {
            success:true,
            user:userData,
            token
        }
    }

    #createToken(payload){
        const token = jwt.sign(payload,jwtSecret,{
            expiresIn:'7d'
        })
        return token
    }

    async #encrypt(string){
        try{
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(string,salt)

            return hash
        }catch(error){
            console.log(error)
        }
    }

    async #compare(string,hash){
        return await bcrypt.compare(string,hash)
    }


}

module.exports = Auth




