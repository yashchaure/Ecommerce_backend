import express from "express";
import {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  readCategory
} from "../controllers/category.controller.js";
import {authenticate, authorizedAdmin} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/", createCategory);
router.get("/categories", authenticate, authorizedAdmin, getAllCategory);
router.put("/:categoryid", updateCategory);
router.delete("/:categoryid", deleteCategory);
router.get("/:id", readCategory);

export default router;
