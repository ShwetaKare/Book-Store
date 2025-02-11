const mongoose= require("mongoose")

const book = mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        maxlength:1000
    },
    language:{
        type:String,
        required:true,
    }
},
{timestamps:true}
)

module.exports = mongoose.model("books",book)