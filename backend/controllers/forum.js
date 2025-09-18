import User from "../models/User.js";
import Paper from "../models/Paper.js";




export const get_forums = async (req, res, next) => {
    try {
        console.log("req cam ine (controller.user.search_for_forum_id)");
        let forums = await Paper.find();
        res.json({ msg: true, forums })
    } catch (e) {
        res.json({ msg: false, error: e.message, message: "error in gettting forums papers" })
    }
}

export const search_for_forum_id = async (req, res, next) => {
    try {
        console.log("req cam ine (controller.user.search_for_forum_id)");
        let forumid = req.query.forumid
        let forums = await Paper.findById(forumid);
        if (!forums) return res.json({ msg: false, message: "forum not found" })
        forums = await Paper.find({
            name: { $regex: forumid, $options: "i" }
        });
        res.json({ msg: true, forums })
    } catch (e) {
        res.json({ msg: false, error: e.message, message: "error in gettting forums papers" })
    }
}

export const upvote_forum = async (req, res, next) => {
    try {
        console.log("req cam ine (controller.user.upvote_forum)");
        let forumid = req.query.forumid
        let forums = await Paper.findById(forumid);
        if (!forums) return res.json({ msg: false, message: "forum not found" })
        forums.upvotes++
        await forums.save()
        res.json({ msg: true, forums })
    } catch (e) {
        res.json({ msg: false, error: e.message, message: "error in gettting forums papers" })
    }
}

export const downvote_forum = async (req, res, next) => {
    try {
        console.log("req cam ine (controller.user.downvote_forum)");
        let forumid = req.query.forumid
        let forums = await Paper.findById(forumid);
        if (!forums) return res.json({ msg: false, message: "forum not found" })
        forums.downvotes++
        await forums.save()
        res.json({ msg: true, forums })
    } catch (e) {
        res.json({ msg: false, error: e.message, message: "error in gettting forums papers" })
    }
}

export const comment_forum = async (req, res, next) => {
    try {
        console.log("req cam ine (controller.user.comment_forum)");
        let forumid = req.body.forumid
        let forums = await Paper.findById(forumid);
        if (!forums) return res.json({ msg: false, message: "forum not found" })
        let name = await User.findById(req.user).select("name -_id")
        let reply = req.body.reply
        let comment = { name:name.name, reply }
        forums.replies.push(comment)
        await forums.save()
        res.json({ msg: true, comment })
    } catch (e) {
        res.json({ msg: false, error: e.message, message: "error in gettting forums papers" })
    }
}