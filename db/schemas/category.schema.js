import mongoose from "mongoose";

const {Schema,models, model} = mongoose;

const categorySchema = new Schema({
    name:{type: String, required:true}

})

const Category = models.category || model('category', categorySchema)

export default Category;