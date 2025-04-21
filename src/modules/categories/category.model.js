import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
  },
  {
    collections: "categories",
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
