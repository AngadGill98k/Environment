import User from "../models/User";
import Paper from "../models/Paper";




export const get_forums=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.user.search_for_forum_id)");
        let forums=await Paper.find(20);
        res.json({msg:true,forums})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in gettting forums papers"})
    }
}

export const search_for_forum_id=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.user.search_for_forum_id)");
        let forumid=req.query.forumid
        let forums=await Paper.findById(forumid);
        if(!forums) return res.json({msg:false,message:"forum not found"})
        res.json({msg:true,forums})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in gettting forums papers"})
    }
}