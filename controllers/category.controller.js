import Category from "../models/category.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(401).json("name is required !!!");
  }

  const existed = await Category.findOne({ name });
  if (existed) {
    res.status(401).json("category is already exists !!!");
  }

  try {
    const category = await Category.create({ name });
    res.status(200).json("user has been created !!!");
  } catch (error) {
    res.status(400).json(error);
  }
});

export const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(201).json(categories);
  } catch (error) {
    res.status(401).json(error);
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryid } = req.params;

  try {
    const category = await Category.findById(categoryid);
    category.name = req.body.name || category.name;

    const updateCategory = await category.save();
    res.status(201).json(updateCategory);
  } catch (error) {
    res.status(401).json(error);
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const {categoryid} = req.params;
        
        const deleteCategory = await Category.findByIdAndDelete(categoryid);
        res.status(201).json("category deleted");
    } catch (error) {
        res.status(401).json(error.message)
    }
})

export const readCategory = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        const singleCategory = await Category.findById(id)
        res.status(201).json(singleCategory)

    } catch (error) {
        res.status(401).json(error.message)
    }
})