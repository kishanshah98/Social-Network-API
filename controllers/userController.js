const User = require('../models/User');

module.exports = {
  // Gets all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Gets single user
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

  // Creates new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // Updates user
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

  // Deletes user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .select('-__v')
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  },

  // Creates friend of user
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

  // Deletes friend of user
  deleteUserFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: {friends: req.params.friendId}}, { new: true })
    .select('-__v')
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  }
};
