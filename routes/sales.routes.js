import { Router } from "express"
import {readFile, writeFile} from 'fs/promises'
import { get_user_byId } from "../utils/user.js"



const file = await readFile('./data/sales.json', 'utf-8')
const saleData = JSON.parse(file)

const router = Router()

//Todas las ventas
router.get('/all', (req,res) =>{
    res.status(200).json(saleData)
})


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


//Agregar una nueva venta

router.post('/newSales', async (req,res)=>{
    try{

        const { userId, date, total, address, products } = req.body;
        if(!userId || !date || !total || !address || !products || !Array.isArray(products) || products.length === 0){
            return res.status(400).json({ error: 'Todos los campos son obligatorios y debe haber al menos un producto.' });
        }

        // Encontrar el ID más alto en la lista de VENTAS
        const lastSaleId = saleData.length > 0 ? saleData[saleData.length - 1].id : 0;
        const newSaleId = lastSaleId + 1;

        const new_sale = {
            "id": newSaleId,
            "userId": userId,
            "date": date,
            "total": total,
            "address": address,
            "products": products
        }

        saleData.push(new_sale)
        await writeFile('./data/sales.json', JSON.stringify(saleData, null, 2), 'utf-8');

        res.status(200).json({ message: 'Venta agregada con éxito', Sale: new_sale });

    }catch(error){
        res.status(500).json({ error: 'Error en el servidor: ' + error.message });
    }
})



//Detalle de venta completo
router.post('/detail', (req,res) =>{
    const from = req.body.from
    const to = req.body.to

    try{
        const arr = saleData.filter(e => e.date >= from && e.date <= to)

        const result = arr.map(e=>{
            return{
                id: e.id,
                products: e.products,
                total: e.total,
                date: e.date,
                userId: get_user_byId(e.userId)
            }
        })
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json("No hay ventas entre tales fechas")
        }

    }catch(error){
        res.send(500).json("Error al buscar")
    }
})


//Eliminar venta
router.delete('/delete/:saleID', (req,res)=>{
    const sale_id = parseInt(req.params.saleID)
    try{
        const index = saleData.findIndex(e => e.id === sale_id)
        if(index != -1){
            saleData.splice(index,1)
            writeFile('./data/sales.json', JSON.stringify(saleData,null,2))
            res.status(200).json("Venta eliminada")
        }else{
            res.status(400).json("Venta no encontrada")
        }

    }catch(error){
        res.status(500).json({ error: 'Error en el servidor: ' + error.message });
    }
})


export default router;