import User from "../models/User.js";
import Paper from "../models/Paper.js";
import Request from "../models/Request.js";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

export const add_moderator=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.admin.add_moderator)");
        let {name,mail,pass}=req.body
        let hashedpass=await bcrypt.hash(pass,10)
        let user=new Admin({name,mail,pass:hashedpass,role:"admin"})
        await user.save()
        res.json({msg:true,user})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in adding moderator"})
    }
}

export const get_moderators=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.admin.get_moderators)");
        let admins=await Admin.find().select("-pass")
        res.json({msg:true,admins})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in getting moderators"})
    }    
}

export const get_papers_to_verify=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.admin.get_papers_to_verify)");
        let papers=await Paper.find()
        res.json({msg:true,papers})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in getting papers to verify"})
    }
}

export const verify_paper=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.admin.verify_paper)");
        let {paperid,requestid}=req.body
        let paper=await Paper.findById(paperid)
        if(!paper) return res.json({msg:false,message:"paper not found"})
        paper.verified=true
        await paper.save()
        let request=await Request.deleteOne({_id:requestid})
        request.save()
        res.json({msg:true,paper})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in verifying paper"})
    }
}

export const reject_paper=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.admin.reject_paper)");
        let {paperid,requestid}=req.body
        let paper=await Paper.findById(paperid)
        if(!paper) return res.json({msg:false,message:"paper not found"})
        paper.verified=false
        await paper.save()
        let request=await Request.deleteOne({_id:requestid})
        request.save()
        res.json({msg:true,paper})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in rejecting paper"})
    }
}

export const bookmark_paper=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.admin.bookmark_paper)");
        let {paperid}=req.body
        let paper=await Paper.findById(paperid)
        if(!paper) return res.json({msg:false,message:"paper not found"})
        let userid=req.user
        let user=await User.findById(userid)
        if(!user) return res.json({msg:false,message:"user not found"})
        user.research_paper.push(paperid)
        await user.save()
        res.json({msg:true,user})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in bookmarking paper"})
    }
}

export const get_bookmarks =async(req,res,next)=>{
    try{
        let userid=req.user
        let user=await User.findById(userid).populate("research_paper")
        if(!user) return res.json({msg:false,message:"user not found"})
        res.json({msg:true,bookmarks:user.research_paper})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in getting bookmarks"})
    }
}
export const read_paper=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.admin.read_paper)");
        let {paperid}=req.body
        let paper=await Paper.findById(paperid)
        if(!paper) return res.json({msg:false,message:"paper not found"})

        
        res.json({msg:true,paper})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in reading paper"})
    }
}