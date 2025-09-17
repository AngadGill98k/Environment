import User from "../models/User";
import Paper from "../models/Paper";


export const add_paper=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.user.add_paper)");
        
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in adding paper"})
    }
}

export const get_user=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.user.get_user)");
        let userid=req.user
        if(!userid) return res.json({msg:false,message:"user not found"})
        let user = await User.findById(userid).select("name mail organization role").populate("research_paper");              
        res.json({msg:true,user})
    }catch(e){
        res.json({msg:false,error:e.message,message:"error in getting user"})
    }
}



