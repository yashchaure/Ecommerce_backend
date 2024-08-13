import express from "express";
import {authenticate, authorizedAdmin} from '../middlewares/authMiddleware.js'
import {
  loginUser,
  registerUser,
  logoutUser,
  allUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  updateUserById,
  getUserById
} from "../controllers/user.controller.js";

const router = express.Router();
//user
router.post("/auth", loginUser);
router.post("/", registerUser);
router.post("/logout",authenticate, logoutUser);

router.get("/profile", authenticate, getCurrentUserProfile);
router.put("/profile", authenticate, updateCurrentUserProfile);

//admin
router.get("/", authenticate, authorizedAdmin, allUser);
router.delete("/:id", authenticate, authorizedAdmin, deleteUserById);
router.put("/:id", authenticate, authorizedAdmin, updateUserById);
router.get("/:id", authenticate, authorizedAdmin, getUserById);

export default router;
