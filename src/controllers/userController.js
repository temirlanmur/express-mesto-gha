const User = require('../models/userModel');

async function getUsers(req, res) {
  const users = await User.find({});

  res.send({ data: users });
}

async function getUser(req, res) {
  const { userId } = req.params;

  const user = await User.find({ _id: userId });

  res.send({ data: user });
}

async function createUser(req, res) {
  const { name, about, avatar } = req.body;

  const user = await User.create({ name, about, avatar });

  res.send({ data: user });
}

async function updateProfile(req, res) {
  const { name, about } = req.body;
  const userId = req.user._id;

  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  );

  res.send({ data: updatedProfile });
}

async function updateProfileAvatar(req, res) {
  const { avatar } = req.body;
  const userId = req.user._id;

  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  );

  res.send({ data: updatedProfile });
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateProfileAvatar,
};
