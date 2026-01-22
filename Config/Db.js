
const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const connect= await mongoose.connect("mongodb://localhost:27017/khushbu")
        console.log("MongoDB connected:", connect.connection.host);
        
    } catch (error) {
        console.log("Error in DB connection", error);
        
    }
}

module.exports=connectDB;