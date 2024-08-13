import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRETE_KEY);
      req.user = await User.findById(decoded.userID);
      console.log(req.user);
      
      next();
    } catch (error) {
      res.status(401).json("Token invalid !!!");
    }
  } else {
    res.status(401).json("Token not found !!!");
  }
});

const authorizedAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else {
        res
        .status(401)
        .send("user not authorized !!!")
    }
}

export { authenticate, authorizedAdmin };
