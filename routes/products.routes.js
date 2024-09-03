import { Router } from "express"
import {readFile, writeFile} from 'fs/promises'

const file = await readFile('./data/products.json', 'utf-8')
const productData = JSON.parse(file)

const router = Router()

//Todos los productos
router.get('/all', (req,res) =>{
    res.status(200).json(productData)
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


//Agregar producto
router.post('/newProduct', async (req,res)=>{
    try{
        const { name, description, price, image, available, stock, category } = req.body;

    if (!name || !description || !price || !image || !stock || available === undefined || !category)  {
        return res.status(400).json({ error: 'Todos los campos son obligatorios'});
    }

     // Encontrar el ID más alto en la lista de productos
     const lastProductId = productData.length > 0 ? productData[productData.length - 1].id : 0;
     const newProductId = lastProductId + 1;

        const new_product = {
            "id": newProductId,
            "name": name,
            "description": description,
            "price": parseFloat(price),
            "image": image,
            "available": Boolean(available),
            "stock": parseInt(stock),
            "category": category
      }
      
      productData.push(new_product);

      await writeFile('./data/products.json', JSON.stringify(productData, null, 2), 'utf-8');

      res.status(200).json({ message: 'Producto agregado con éxito', Product: new_product });

    }catch(error){
        res.status(500).json({ error: 'Error en el servidor: ' + error.message });
    }
})


//Actualizar precio
router.put('/update/price/:productID', (req,res) =>{
    const product_id = parseInt(req.params.productID)
    const new_price = req.body.price
    try{
        const index = productData.findIndex(e=> e.id === product_id)
        if(index != -1){
            productData[index].price = new_price
            writeFile('./data/products.json', JSON.stringify(productData,null,2))
            res.status(200).json("Precio actualizado")
        }else{
            res.status(400).json("ID no encontrado")
        }
    }catch(error){
        res.send(500).json("Error al actualizar precio")
    }
})

//Actualizar stock

router.put('/update/stock/:productID', (req,res)=>{
    const product_id = parseInt(req.params.productID)
    const new_stock = req.body.stock
    try{
        const index = productData.findIndex(e=> e.id === product_id)
        if(index != -1){
            productData[index].stock = new_stock
            writeFile('./data/products.json', JSON.stringify(productData,null,2))
            res.status(200).json("Stock actualizado")
        }else{
            res.status(400).json("ID no encontrado")
        }
    }catch(error){
        res.send(500).json("Error al actualizar stock")
    }
})


export default router;
