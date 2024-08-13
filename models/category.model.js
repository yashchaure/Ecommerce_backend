import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLenght: 32,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
