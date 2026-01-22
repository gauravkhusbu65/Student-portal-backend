const mongoose=require('mongoose');

const student=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    course:{
        type:String,
        required:true
    },
   

});

module.exports=mongoose.model("Student", student);