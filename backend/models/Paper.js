import mongoose from "../db.js";

const paperschema=new mongoose.Schema({
    title:String,
    description:String,
    refrence_links:[String],
    verified:Boolean,
    verified_by:String,
    organization:String,
    upvote:Number,
    downvote:Number,
    replies:[{name:String,reply:String}],
    file:Object
})

const Paper=mongoose.model('Paper',paperschema)
export default Paper