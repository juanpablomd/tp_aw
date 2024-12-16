import { Router } from "express"
import { createComentario, getAllComentarios } from "../db/actions/comentarios.actions.js";

const router = Router()

// Ruta para obtener todos los comentarios
router.get("/allcomentarios", async (req, res) => {
    try {
        const comentarios = await getAllComentarios();
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los comentarios", error: error.message });
    }
});

router.post("/addcomentario", async (req, res) => {
    const { text, userId } = req.body;
    console.log('userId recibido en backend:', userId);

    if (!text || !userId) {
        return res.status(400).json({ message: "Texto y userId son requeridos" });
    }

    try {
        const nuevoComentario = await createComentario({ text, userId });
        res.status(201).json(nuevoComentario);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el comentario", error: error.message });
    }
});

export default router;