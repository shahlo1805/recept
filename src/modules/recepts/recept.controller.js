import receptModel from "./recept.model.js";


const createRecept = async (req, res, next) => {
  try {
    const {
      title,
      description,
      preparationPlan,
      ingredients,
      categoryId,
    } = req.body;

    const userId = req.user_id;

    // Rasm va video fayllar
    const image = req.files?.image?.[0]?.filename;
    const video = req.files?.video?.[0]?.filename;

    if (!image) {
      return res.status(400).json({ message: "Image berib yuboring" });
    }

    const newRecept = await receptModel.create({
      title,
      description,
      preparationPlan,
      ingredients,
      categoryId,
      userId,
      image,
      video,
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

    const updateData = {
      ...req.body,
    };

    // Fayllar bo‘lsa yangilash
    if (req.files?.image?.[0]) {
      updateData.image = req.files.image[0].filename;
    }

    if (req.files?.video?.[0]) {
      updateData.video = req.files.video[0].filename;
    }

    const updatedRecept = await receptModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

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

    const deleted = await receptModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Recept not found" });
    }

    res.status(200).json({ message: "Recept deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getAllRecept = async (req, res, next) => {
  try {
    const recepts = await receptModel.find()
      .populate("categoryId", "categoryName")
      .populate("userId", "name");

    res.status(200).json(recepts);
  } catch (err) {
    next(err);
  }
};

const getOneRecept = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recept = await receptModel.findById(id)
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

export default { createRecept, updateRecept, deleteRecept, getAllRecept, getOneRecept }