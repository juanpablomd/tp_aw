
import { Router } from "express"
import {readFile, writeFile} from 'fs/promises'


const file = await readFile('./data/users.json', 'utf-8')
const userData = JSON.parse(file)

const router = Router()


//Obtener todos los usuarios
router.get('/all', (req,res) =>{
    res.status(200).json(userData)
})


//Usuario por ID
router.get('/users/byId/:id', (req,res) =>{
    const id = parseInt(req.params.id)
    try{
        const result = userData.find(e=> e.id === id)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json(`${id} no se encuentra`)
        }
    }catch(error){
        res.send(500).json("Error al buscar")
    }
})


//Agregar usuario
router.post('/newUser', async (req,res)=>{
    try{
        const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios'});
    }

     // Encontrar el ID más alto en la lista de usuarios
     const lastUserId = userData.length > 0 ? userData[userData.length - 1].id : 0;
     const newUserId = lastUserId + 1;

        const new_user = {
        "id": newUserId,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
      }
      
      userData.push(new_user);

      await writeFile('./data/users.json', JSON.stringify(userData, null, 2), 'utf-8');

      res.status(200).json({ message: 'Usuario agregado con éxito', user: new_user });

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

//Validar usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
        }

        const user = userData.find(e => e.email === email && e.password === password);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (!password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Si todo es correcto, el usuario es validado
        res.status(200).json({ message: 'Usuario validado correctamente', user: { email: user.email, firstName: user.firstName, lastName: user.lastName } });

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor: ' + error.message });
    }
});







export default router;