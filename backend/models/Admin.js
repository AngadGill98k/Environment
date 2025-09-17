import mongoose from "../db.js"

const Adminschema=new mongoose.Schema({
    name:String,
    mail:String,
    pass:String,
    organization:String,
    research_paper:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paper'
    }],
    role:String
})
const Admin=mongoose.model('Admin',Adminschema)
export default Admin