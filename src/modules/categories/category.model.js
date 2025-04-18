import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collation: "Category",
    timestamps: true,
    versionKey: false
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;