import mongoose from "mongoose";

const {Schema,models,model, ObjectId} = mongoose;

const ProductSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    available: {type: Boolean, required: true},
    stock: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref:"category", required: true},
})

const Product = models.product || model('product', ProductSchema)

export default Product;