const User = require('../models/User');

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'There is no user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true, runValidators: true })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'There is no user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .select('-__v')
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  },

  createUserFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: {friends: req.params.friendId}}, { new: true })
    .select('-__v')
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'There is no user with that ID' })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
  },

  deleteUserFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: {friends: req.params.friendId}}, { new: true })
    .select('-__v')
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  }
};
