const mongoose=require("mongoose")


const contactSchema=new mongoose.Schema({

    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },
    mobile_number:{
        type:Number,
        require:true
    },
    data_store:{
        type:String,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }


},{timestamps:true})

module.exports=mongoose.model("contact",contactSchema)
