import express, { json } from 'express'
import {readFile, writeFile} from 'fs/promises'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/products.routes.js'
import saleRouter from './routes/sales.routes.js'


//Crear instancia de app
const app = express()

//Puerto
const port = 3000

app.use(express.json())

app.listen(port, () =>{
    console.log(`Servidor levantado en puerto ${port}`)
})


//RUTAS DE USUARIO
app.use('/user', userRouter)

//RUTAS DE PRODUCTOS
app.use('/product', productRouter)

//RUTAS DE VENTAS
app.use('/sale', saleRouter)