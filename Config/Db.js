
const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const connect= await mongoose.connect("mongodb+srv://gauravkhusbu65_db_user:xjbkCXOuoc2cbbo9@cluster0.dbtsyed.mongodb.net/?appName=Cluster0")
        console.log("MongoDB connected:", connect.connection.host);
        
    } catch (error) {
        console.log("Error in DB connection", error);
        
    }
}

module.exports=connectDB;