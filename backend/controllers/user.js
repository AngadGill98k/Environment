import User from "../models/User.js";
import Paper from "../models/Paper.js";
import Request from "../models/Request.js";


export const add_paper=async(req,res,next)=>{
    try{
        console.log("req cam ine (controller.user.add_paper)",req.file);
        let {name,description}=req.body
        let userid=req.user
        let file=req.file
        if(!userid) return res.json({msg:false,message:"user not found"})
        let user=await User.findById(userid)
        

        let paper=new Paper({
            title:name,
            description,
            refrence_links:[],
            organization:user.organization,
            verified:false,
            verified_by:"",upvote:0,downvote:0,
            replies:[],file
        })
        await paper.save()
        let request=new Request({
            name:user.name,
            mail:user.mail,
            organization:user.organization,
            research_paper:paper._id,
            userid:user._id,
            name,
            description,
            paperid:paper._id,
        })
        await request.save()
        
        user.research_paper.push(paper._id)
        await user.save()

        res.json({msg:true,message:"paper added successfully"})
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
 


