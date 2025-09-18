import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Paper from "../models/Paper.js";
import { fromPath } from "pdf2pic";
import path from "path"
export const read_paper = async (req, res, next) => {
    try {
        console.log("req cam ine (controller.admin.read_paper)");
        let paper = req.body
        let file = await Paper.findById(paper._id)
        file = file.file
        let options = {
            density: 150,
            savePath: null,
            format: "png",
            width: 800,
            height: 1000
        };
        const filePath = path.resolve(file.path).replace(/\\/g, "/"); 
        
        const convert = fromPath(filePath, options);
        
        // convert ALL pages to buffers
        const result = await convert.bulk(-1, { responseType: "base64" });
        console.log(result);
        // result = array of { page: x, base64: "..." }
        // send them to frontend
        res.json({
            msg: true,
            pages: result.map((r) => ({
                page: r.page,
                image: `data:image/png;base64,${r.base64}`,
            })),
        });
    } catch (e) {
        res.json({ msg: false, error: e.message, message: "error in reading paper" })
    }
}