import userModel from "./user.model.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();

    res.send({
      message: "success",
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const user = await userModel.findOne({ _id: req.user_id });

  const { bio, name } = req.body;

  user.profileImage = req.file.filename;
  user.bio = bio;
  user.name = name;

  await user.save();

  res.status(200).send({
    message: "User successfully updated",
  });
};

export default {
  getAllUsers,
  updateProfile,
};
