import mongoose from "mongoose";

const receptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: mongoose.SchemaTypes.Array,
      required: true,
    },
    videos: {
      type: mongoose.SchemaTypes.Array,
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
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User modeliga bog‘lanadi
      required: true,
    },
  },
  {
    collection: "recepts",
    timestamps: true,
    versionKey: false,
  }
);

const Recept = mongoose.model("Recept", receptSchema);

export default Recept;
