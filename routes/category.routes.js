//funcion de express para crear rutas y poder exportarlas
import { Router } from "express";
//funcion de node js para leer archivos
import {readFile} from 'fs/promises';
import { createCategory,allCategory } from "../db/actions/category.actions.js";

//lee y trae el archivo
const fileCategories = await readFile('./data/category.json','utf-8')
//Lo convierte en JSON.
const categoriesData = JSON.parse(fileCategories)

const router = Router()

router.get('/all',async (req,res) =>{
try {
    const result = await allCategory()
    res.status(200).json(result)
} catch (error) {
    res.status(500).json('Error en el servidor: ' + error.message);
}
})


router.post('/newcategory/', async (req,res) =>{
    try {
       const {name} = req.body
    
       const result = await createCategory({name})
     
       res.status(200).json(result)
       
    } catch (error) {
       console.log(error)
       res.status(400).json()
    }
    })


export default router;