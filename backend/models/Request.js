import mongoose from "../db.js";

const requestSchema=new mongoose.Schema({
    name:String,
    mail:String,
    userid:String,
    organization:String,
    research_paper:Object,
    name:String,
    description:String,
    paperid:String,
})
const Request=mongoose.model('Request',requestSchema)
export default Request