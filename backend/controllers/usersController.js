const UserModel = require("../models/User");
const ReviewModel = require("../models/Review");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { genDupErrMsg } = require("../utils/controllerHelpers");
const handlePatchDuplication = require("../utils/controllerHelpers");
const mongoose = require("mongoose"); // For CommonJS modules

// @desc Get all users
// @route GET /users
// @access Public
const getAllUsers = async (req, res) => {
  try {
    // Get all users from MongoDB
    const users = await UserModel.find().select("-password").lean();

    // If no users
    if (!users?.length) {
      return res.status(400).json({ message: "No users found" });
    }

    // Reverse the array to get most recent first
    const reversedUsers = users.reverse();

    res.json(reversedUsers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: err.message });
  }
};

// @desc Get user
// @route GET /users/:id
// @access Public
const getUserById = async (req, res) => {
  const { id } = req.params;

  // Check if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "We could not find that account." });
  }

  const user = await UserModel.findById(id).select("-password").lean();

  if (!user) {
    return res.status(400).json({ message: "We could not find that account." });
  }

  res.json(user);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const { email, username, password } = req.body;

  // Confirm data
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "All fields are required to create an account" });
  }

  // Check for duplicate username
  const duplicateUsername = await UserModel.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicateUsername) {
    return res.status(409).json({ message: "Username is already in use" });
  }
  // Check for duplicate email
  const duplicateEmail = await UserModel.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicateEmail) {
    return res.status(409).json({ message: "Email is already in use" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { username, email, password: hashedPwd };

  // Create and store new user
  const user = await UserModel.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

// @desc Update user
// @route PATCH /users/:id
// @access Private
const updateUser = async (req, res) => {
  const {
    email,
    username,
    newPassword,
    oldPassword,
    imdbId,
    title,
    type,
    hasWatched,
  } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "No user id found" });
  }

  const user = await UserModel.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (username && email) {
    // Find if the username is taken by another user
    const isUsernameTaken = await UserModel.findOne({
      username,
      _id: { $ne: id }, // Exclude the current user by their ID
    })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (isUsernameTaken) {
      return res.status(400).json({ message: "Username already taken." });
    }
    //check email
    const isEmailTaken = await UserModel.findOne({
      email,
      _id: { $ne: id },
    })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (isEmailTaken) {
      return res.status(400).json({ message: "Email already taken." });
    }

    user.username = username;
    user.email = email;
  }

  if (newPassword && oldPassword) {
    const match = await bcrypt.compare(oldPassword, user.password);
    if (match) {
      console.log("Old password is a match");
      user.password = await bcrypt.hash(newPassword, 10);
    } else {
      console.log("Old password not a match");
      return res.status(400).json({ message: "Incorrect password" });
    }
  }

  if (imdbId && title && type) {
    const movieExists = user.likedMovies.some(
      (movie) => movie.imdbId === imdbId,
    );

    if (!movieExists) {
      user.likedMovies.push({ imdbId, title, type, hasWatched: false });
    } else {
      return res.status(400).json({ message: "Movie already liked" });
    }
  }

  if (imdbId && !title && !hasWatched) {
    user.likedMovies = user.likedMovies.filter(
      (movie) => movie.imdbId !== imdbId,
    );
  }

  if (hasWatched) {
    const currMovie = user.likedMovies.find((movie) => movie.imdbId === imdbId);
    if (currMovie) {
      currMovie.hasWatched = hasWatched;
      user.markModified("likedMovies");
      await user.save();
    }
  }

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
};

// @desc Delete user
// @route DELETE /users/:id
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Find and delete all reviews associated with the user
  await ReviewModel.deleteMany({ user: id }).exec();

  // Find the user
  const user = await UserModel.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Delete the user
  const result = await user.deleteOne();
  const reply = `Username ${result.username} with ID ${result.id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
