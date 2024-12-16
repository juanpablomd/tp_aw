import { Router } from "express"
import {readFile, writeFile} from 'fs/promises'
import { verify } from "../utils/middleware.js"
import { createSale } from "../db/actions/sales.actions.js"


const file = await readFile('./data/sales.json', 'utf-8')
const saleData = JSON.parse(file)

const router = Router()


//Venta por ID
router.get('/sales/byId/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    try{
        const result = saleData.find(e=> e.id === id)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json(`Venta no encontrada`)
        }
    }catch(error){
        res.send(500).json("Error al buscar")
    }
})



//CARGAR UNA NUEVA VENTA EN VENTAS.JSON
router.post('/newSales/', async (req,res) =>{

    try {
       const userId = req.body.userId
       const date = req.body.date
       const total = req.body.total
       const email = req.body.email
       const products = req.body.products
       const token = req.body.token
       const verificado = await verify(token)
 
 
       if (verificado) {
        const newSale = await createSale({ userId, date, total, email, products });
        res.status(200).json({ success: true, sale: newSale });
    } else {
        res.status(200).json({ success: false, message: "Token inválido" });
    }
 
       
    } catch (error) {
       res.status(400).json(error);
    }
 
     
 
 })



//Obtener todas las ventas
router.post('/sales/', (req,res)=>{
    try {

       const id = req.body.id
       const result = saleData.find(e => e.id == id)
       if(result){
 
         const respuesta = {
             number_sale: result.id,
             date_sale: result.date,
             total: result.total
         };
 
         res.status(200).json(respuesta)
       }
       else{
          res.status(400).json('Venta no encontrada')
       }
    } catch (error) {
       res.status(500).json('Error en el servidor: ' + error.message);
    }
 })


//Eliminar venta
router.delete('/deletesale/:id', async (req,res)=>{
    try {
       const id = parseInt(req.params.id)
         // Encontrar el índice del elemento a eliminar
         const index = saleData.findIndex(e => e.id === id);
 
         if (index !== -1) {
             // Elimina el elemento del array
             saleData.splice(index, 1);
 
             // Guardar los datos actualizados en el archivo
             await writeFile('./data/sales.json', JSON.stringify(saleData, null, 2), 'utf-8');
             res.status(200).json({ message: "Venta eliminada con éxito" });
         } else {
             res.status(400).json('Venta no encontrada');
         }
    } catch (error) {
       res.status(500).json('Error en el servidor: ' + error.message);
    }
 })





export default router;