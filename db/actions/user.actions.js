import { connectDatabase } from "../connection.db.js";
import User from "../schemas/user.schema.js"

export const createUser = async({firstName,lastName,email,password}) =>{
    try {
        await connectDatabase() //Conexion BD
        const res = await User.create({firstName,lastName,email,password}) //Creo Usuario con los parametros solicitados
    
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}

export const validateUser = async(email) =>{
    try {
        await connectDatabase()
        const res = await User.findOne({email: email})

        return JSON.parse(JSON.stringify(res))

    } catch (error) {
        console.log(error)
    }
    
    
}