
import mongoose from "mongoose";

const {Schema,models,model, ObjectId} = mongoose;

const comentarioSchema = new Schema ({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

const Comentario = models.comentario || model('Comentario', comentarioSchema);

export default Comentario;
