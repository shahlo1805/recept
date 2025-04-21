import { isValidObjectId } from "mongoose";
import receptModel from "./recept.model.js";
import { BaseException } from "../../exception/base.exception.js";
import categoryModel from "../categories/category.model.js";

const createRecept = async (req, res, next) => {
  try {
    const { title, description, preparationPlan, ingredients, categoryId } =
      req.body;

    if (!isValidObjectId(categoryId)) {
      throw new BaseException("Invalid category");
    }

    const category = await categoryModel.find({ _id: categoryId });

    if (!category) {
      throw new BaseException("Invalid category");
    }

    const userId = req.user_id;

    if (!req.files.images) {
      return res.status(400).json({ message: "Rasm yuklash majburiy" });
    }

    const newRecept = await receptModel.create({
      title,
      description,
      preparationPlan,
      ingredients,
      category: categoryId,
      user: userId,
      images: req.files.images.map((image) => image.filename),
      videos: req.files.videos?.map((video) => video.filename),
    });

    res.status(201).json({
      message: "Recept created successfully",
      recept: newRecept,
    });
  } catch (err) {
    next(err);
  }
};

const updateRecept = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedRecept = await receptModel.findOneAndUpdate(
      { userId: req.user_id, _id: id },
      {
        ...req.body,
        category: req.body.categoryId,
        user: req.body.userId,
      },
      { new: true }
    );

    if (!updatedRecept) {
      return res.status(404).json({ message: "Recept not found" });
    }

    res.status(200).json({
      message: "Recept updated",
      recept: updatedRecept,
    });
  } catch (err) {
    next(err);
  }
};

const deleteRecept = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await receptModel.findOneAndDelete({
      user: req.user_id,
      _id: id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Recept not found" });
    }

    res.status(200).json({ message: "Recept deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getMyRecepts = async (req, res, next) => {
  try {
    const recepts = await receptModel
      .find({ user: req.user_id })
      .populate("category", "name -_id")
      .populate("user", "name -_id");

    res.status(200).json(recepts);
  } catch (err) {
    next(err);
  }
};

// const getAllReceptsByCategory = async (req, res, next) => {
//   try {
//     const { categoryId } = req.params;
//     const recepts = await receptModel.find({ category: categoryId });

//     res.status(200).json(recepts);
//   } catch (err) {
//     next(err);
//   }
// };

const getAllRecept = async (req, res, next) => {
  const { categoryId, page = 1, limit = 10 } = req.query;

  try {
    const filter = {};
    if (categoryId) {
      filter.category = categoryId;
    }

    const skip = (page - 1) * limit;

    const recepts = await receptModel
      .find(filter)
      .skip(skip)
      .limit(Number(limit))
      .populate("category", "name -_id")
      .populate("user", "name -_id");

    const total = await receptModel.countDocuments(filter);
    const umumiyPages = Math.ceil(total / limit);

    res.status(200).json({
      joriyPage: Number(page),
      umumiyPages,
      count: total,
      recepts,
    });
  } catch (err) {
    next(err);
  }
};

const getOneRecept = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recept = await receptModel
      .findById(id)
      .populate("categoryId", "categoryName")
      .populate("userId", "name");

    if (!recept) {
      return res.status(404).json({ message: "Recept not found" });
    }

    res.status(200).json(recept);
  } catch (err) {
    next(err);
  }
};

export default {
  createRecept,
  updateRecept,
  deleteRecept,
  getAllRecept,
  getOneRecept,
  getMyRecepts,
  // getAllReceptsByCategory,
};
