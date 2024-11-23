import mongoose from "mongoose";

const {Schema,models,model, ObjectId} = mongoose;

const SaleSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
    date: {type: String, required:true},
    total: {type: Number, required:true},
    email: {type: String, required:true},
    products: [{
        productId: {type: mongoose.Schema.Types.ObjectId, required:true, ref:"product"},
        quantity: {type: Number, required:true},
        _id: false // Deshabilita la generación de _id para subdocumentos
    }
    ]

})

const Sale = models.Sale || model('sale', SaleSchema)

export default Sale;