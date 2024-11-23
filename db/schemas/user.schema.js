import mongoose from "mongoose";

const {Schema,models, model} = mongoose;

const userSchema = new Schema({
    firstName:{type: String, required:true},
    lastName:{type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true}
})

const User = models.user || model('user', userSchema)

export default User;