const User = require('../models/userModel');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.find({ _id: userId })
    .then((user) => res.send({
      data: user,
    }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({
      data: user,
    }));
};

module.exports = {
  getUser,
  getUsers,
  createUser,
};
