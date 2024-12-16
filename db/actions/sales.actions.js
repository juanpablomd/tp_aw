import { connectDatabase } from "../connection.db.js";
import Sale from "../schemas/sales.schema.js";

export const createSale = async({userId,date,total,email,products}) =>{
    try {
        await connectDatabase()

        console.log("Datos recibidos para la venta:", { userId, date, total, email, products });

        // Crear el producto con la referencia a la categoría
        const sale = await Sale.create({ userId, date, total, email, products });
        console.log("Venta registrada exitosamente:", sale);
        
        return JSON.parse(JSON.stringify(sale));
    } catch (error) {
        console.error("Error al registrar la venta:", error.message);
    }
    
    }