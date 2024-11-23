import { Router } from "express"
import {readFile, writeFile} from 'fs/promises'
import { createProd,productByCategory, findAll } from "../db/actions/products.actions.js";

const file = await readFile('./data/products.json', 'utf-8')
const productData = JSON.parse(file)

const router = Router()

//Lista de todos los productos
router.get('/allproducts', async (req,res)=>{
    try {

        const result = await findAll()
       if(result){

         res.status(200).json(result)
         console.log(result)
       }
       else{
          res.status(400).json('No hay productos en venta')
       }
  
       
    } catch (error) {
       res.status(500).json('Error en el servidor: ' + error.message);
    }
 
 })



//Producto por ID
router.get('/products/byId/:id', (req,res) =>{
    const id = parseInt(req.params.id)
    try{
        const result = productData.find(e=> e.id === id)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json(`${id} no se encuentra`)
        }
    }catch(error){
        res.send(500).json("Error al buscar")
    }
})


//Nuevo producto
router.post('/newProduct/', async (req,res) =>{
    try {
       const {name,desc,price,image,en_stock,categoryName} = req.body
    
       const result = await createProd({name:name,desc,price:price,image,stock:en_stock,categoryName})
    
       res.status(200).json(result)
       
    } catch (error) {
       console.log(error)
       res.status(400).json()
    }
    })




 //Lista de productos por categoria
 router.post('/ProductsByCategory', async (req, res) => {
    try {
        const categoryName = req.body.name;
        const result = await productByCategory(categoryName);
        if(result){
            res.status(200).json(result);
        } else {
            res.status(200).json([]); // Devuelve un arreglo vacío si no hay productos
        }
    } catch (error) {
        res.status(500).json('Error en el servidor: ' + error.message);
    }
 });
 


export default router;
