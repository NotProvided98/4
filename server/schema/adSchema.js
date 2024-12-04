const moongoose=require("mongoose")

const adSchema=new moongoose.Schema({
    title:{
        type:String,
        required:true,
        // unique:true
    },
    text:{
        type:String,
        required:true,
    }
},{timestamps:true})

const AdModel=moongoose.model("ads",adSchema)
module.exports=AdModel