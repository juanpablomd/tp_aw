import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/products.routes.js'
import saleRouter from './routes/sales.routes.js'
import categoryRouter from './routes/category.routes.js'

//Crear instancia de app
const app = express()

//Puerto
const port = 3000

app.use(express.json())

app.listen(port, () =>{
    console.log(`Servidor levantado en puerto ${port}`)
})


app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'],

}))

//RUTAS DE USUARIO
app.use('/user', userRouter)

//RUTAS DE PRODUCTOS
app.use('/product', productRouter)

//RUTAS DE VENTAS
app.use('/sale', saleRouter)

app.use('/category', categoryRouter)

