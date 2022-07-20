const UserModel = require("../models/user")

class Users{
    //El administrador puede ver todos los usuarios
    async getAll(){
        try{
            const users = await UserModel.find()
            return users 
        }catch(error){
            console.log(error)
        }
    }

    //Se registra un usuario nuevo

    async create(data){
        try{
            const user = await UserModel.create(data)
            return user 
        }catch(error){
            if(error.code===11000){
                const message = `The email "${error.keyValue.email}" has already been registered`

                return {
                    error:true,
                    message
                }
            }
            // if(error.errors.name){
            //     const message = `Please enter a name `

            //     return {
            //         error:true,
            //         message
            //     }
            // }

            // if(error.errors.password){
            //     const message = `Please enter a password `

            //     return {
            //         error:true,
            //         message
            //     }
            // }
            // if(error.errors.email){
            //     const message = `Please enter a email`

            //     return {
            //         error:true,
            //         message
            //     }
            // }
            // if(error.errors.role){
            //     const message = `Please select a role `

            //     return {
            //         error:true,
            //         message
            //     }
            // }
 
            

        }
    }

    // Actualiza los datos de un usuario a traves de su ID

    async update(id,data){
        try{
            const user = await UserModel.findByIdAndUpdate(id,data,{new:true})
            return user 
        }catch(error){
            console.log(error)
        }
    }

    //Elimina un usuario a partir de su id

    async delete(id){
        try{
            const user = await UserModel.findByIdAndDelete(id)
            return user 
        }catch(error){
            console.log(error)
        }
    }

    // Nos permite hacer el login
    async getByEmail(email){
        try {
            const user = await UserModel.findOne({email})
            return user  
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Users