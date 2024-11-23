
import { Router } from "express"
import {readFile, writeFile} from 'fs/promises'
import bcrypt from 'bcryptjs';
import { sign, decode } from "../utils/middleware.js";
import { createUser, validateUser } from "../db/actions/user.actions.js";
import { connectDatabase } from "../db/connection.db.js";
import User from "../db/schemas/user.schema.js";

const file = await readFile('./data/users.json', 'utf-8')
const userData = JSON.parse(file)

const router = Router()

const SECRET = 'zqAGhJuvn3hY5pJOQ-p5f97GAzohYTGTIHfoUqjYft7mhQCHtkDK8QY_fRz7zQxC'


// Registrar nuevo usuario
router.post('/newUser', async (req,res)=>{
    try{
        await connectDatabase();
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios'});
        }
        
        const hashedPass = bcrypt.hashSync(password, 8)

        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const newUser =   {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": hashedPass
          }

        const result = await createUser({firstName, lastName, email, password: hashedPass})
        // Responder con éxito
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
        });
    }catch(error){
        res.status(500).json({ error: 'Error en el servidor: ' + error.message });
    }
})





//Actualizar email
router.put('/email/update/:userID', (req,res)=>{
    const user_id = req.params.userID
    const new_Email = req.body.email

    try{
        const index = userData.findIndex(e => e.id == user_id)
        if(index != -1){
            userData[index].email = new_Email
            writeFile('./data/users.json', JSON.stringify(userData,null,2))
            res.status(200).json("Email actualizado")
        }else{
            res.status(400).json("Usuario no encontrado")
        }
    }
    catch(error){
        res.send(500).json("Error al actualizar email")
    };
    
})



//Validación de usuarios
router.post('/validation', async (req,res)=>{
    try{
        const { email, password } = req.body;
        const result = await validateUser(email)
        if (!result) {
            return res.status(404).send({ status: false, message: 'Usuario no encontrado' });
        }

        const controlPass = bcrypt.compareSync(password , result.password)

        const results = {
            "id": result.id,
            "firstName": result.firstName,
            "lastName": result.lastName,
            "email" : result.email
        }
       
        if (controlPass) {
            const token = await sign(results)
            const decodificado = await decode(token)
            res.status(200).json({"decode":decodificado,"token":token});    
       } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
       }
    }catch(error){
        res.status(500).json({ error: 'Error en el servidor: ' + error.message });
    }
})




export default router;