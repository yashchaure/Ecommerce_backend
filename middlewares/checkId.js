import { isValidObjectId } from "mongoose";


function checkId (req, res, next) {
    if(!isValidObjectId(req, res, next)){
        res.status(404);
        throw new Error("Invalid Object of id")
    }
    next();
}

export default checkId;