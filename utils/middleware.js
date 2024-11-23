import jwt from 'jsonwebtoken'
const SECRET = 'zqAGhJuvn3hY5pJOQ-p5f97GAzohYTGTIHfoUqjYft7mhQCHtkDK8QY_fRz7zQxC'

export const sign = async (result)=>{

    if(!result){
        return false
    }

    try {
        const token = await jwt.sign({...result}, SECRET, {expiresIn: 10000} )
        return token
    } catch (error) {
        console.log(error)
        return false
    }
}

export const verify = async (token) =>{

    if(!token){
        return false
    }

    try {

        const decode = await jwt.verify(token, SECRET)
        if(decode){
            return true
        }
         
    } catch (error) {
        console.log(error)
        return false
    }
}

export const decode = async (token) => {
    const isValid = await verify(token);
    console.log(isValid)
    if (!isValid) {
        return false;
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        return decoded;
    } catch (error) {
        console.log('Error al decodificar el token:', error);
        return false;
    }
};