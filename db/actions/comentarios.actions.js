
import { connectDatabase } from "../connection.db.js";
import Comentario from "../schemas/comentarios.schema.js";
import User from "../schemas/user.schema.js";  


// Crear un nuevo comentario
export const createComentario = async ({ text, userId }) => {
    try {
        await connectDatabase();

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`Usuario con ID ${userId} no encontrado`);
        }

        // Crear el comentario
        const newComentario = await Comentario.create({
            text,
            userId,
            date: new Date().toISOString(), // Registrar la fecha actual en formato ISO
        });

        // Devolver el comentario creado y populado
        const populatedComentario = await Comentario.findById(newComentario._id).populate('userId');
        return populatedComentario;
    } catch (error) {
        console.error('Error al crear comentario:', error);
        throw error;
    }
};


// Obtener todos los comentarios
export const getAllComentarios = async () => {
    try {
        await connectDatabase();

        // Obtener todos los comentarios
        const comentarios = await Comentario.find().populate('userId');
        return JSON.parse(JSON.stringify(comentarios));
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        throw error;
    }
};