import express from "express";
import path from "path";
const app=express();
const PORT=3001


import http from "http";
const server=http.createServer(app)
import { Server } from "socket.io";

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
import socketHandler from "./sockets.js";
socketHandler(io);
 




app.use(express.json());
// app.use(express.static(path.join(__dirname,"public")));










import cors from "cors";
import cookieParser from "cookie-parser";
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(cookieParser());



import {passport} from "./auth.js"
app.use(passport.initialize());



import multer from "multer";
import storage from "./multer.js";
const upload=multer({storage:storage});


app.use('/uploads', express.static('uploads'));



//Common
import {read_paper} from "./controllers/common.js"
app.post('/read_paper',passport.authenticate('jwt', { session: false }),read_paper)


import {refresh_access_token,signin,signup,logout} from "./controllers/login.js"
app.get('/refresh',refresh_access_token)

app.post('/signin', signin);

app.post('/signup', signup);

app.post('/logout', logout);

//use this is proected routes passport.authenticate('jwt', { session: false }),
import {add_paper,get_user} from "./controllers/user.js"
app.post('/add_paper',passport.authenticate('jwt', { session: false }),upload.single('file'),add_paper)

app.get('/get_user',passport.authenticate('jwt', { session: false }),get_user)


import {add_moderator,get_papers_to_verify,verify_paper,reject_paper, bookmark_paper,get_bookmarks,get_moderators,paper_filler} from "./controllers/admin.js"
app.post('/get_moderators',passport.authenticate('jwt', { session: false }),get_moderators)

app.post('/add_moderator',passport.authenticate('jwt', { session: false }),add_moderator)

app.get('/get_papers_to_verify',passport.authenticate('jwt', { session: false }),get_papers_to_verify)

app.post('/verify_paper',passport.authenticate('jwt', { session: false }),verify_paper)

app.post('/reject_paper',passport.authenticate('jwt', { session: false }),reject_paper)

app.post('/bookmark_paper',passport.authenticate('jwt', { session: false }),bookmark_paper)

app.post('/get_bookmarks',passport.authenticate('jwt', { session: false }),get_bookmarks)

app.post('/paper_filler',paper_filler)

import {get_forums,search_for_forum_id,upvote_forum,downvote_forum,comment_forum} from "./controllers/forum.js"
app.get('/get_forums',get_forums)

app.get('/search_for_forum_id',search_for_forum_id)

app.post('/upvote_forum',passport.authenticate('jwt', { session: false }),upvote_forum)

app.post('/downvote_forum',passport.authenticate('jwt', { session: false }),downvote_forum)

app.post('/comment_forum',passport.authenticate('jwt', { session: false }),comment_forum)
server.listen(PORT,()=>{
    console.log("server started");
})
