import mongoose from "../db";

const paperschema=new mongoose.Schema({
    title:String,
    description:String,
    refrence_links:[String],
    verified:Boolean,
    verified_by:String,
    organization:String
})

const Paper=mongoose.model('Paper',paperschema)
export default Paper