import mongoose from "mongoose";
import 'dotenv/config'
const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || {conn:null, promise:null}

export const connectDatabase = async () =>{
    if(cached.conn) return cached.conn

    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing')

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI,{
        dbName: 'MongoDB1',
        bufferCommands: false
    })
    cached.conn = await cached.promise;
    return cached.conn
}