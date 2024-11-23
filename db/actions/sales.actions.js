import { connectDatabase } from "../connection.db.js";
import Sale from "../schemas/sales.schema.js";

export const createSale = async({userId,date,total,email,products}) =>{
    try {
        await connectDatabase()
    
        console.log(products)
        // Crear el producto con la referencia a la categoría
        const res = await Sale.create({
            userId,
            date,
            total,
            email,
            products
        });
        
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log(error)
    }
    
    }