import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    token: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["admin", "super_admin"],
      required: false,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
      match: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
    },
    bio: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    profileImage: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
  },
  {
    collections: "users",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
