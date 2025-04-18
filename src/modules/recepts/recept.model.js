import mongoose from "mongoose";

const receptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    preparationPlan: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User modeliga bog‘lanadi
      required: true,
    },
  },
  {
    collation: "recepts",
    timestamps: true,
    versionKey: false
  }
);

const Recept = mongoose.model("Recept", receptSchema);

export default Recept;