const moongoose=require("mongoose")

const userSchema=new moongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

const UserModel=moongoose.model("users",userSchema)
module.exports=UserModel