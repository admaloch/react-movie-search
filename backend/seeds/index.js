const mongoose = require("mongoose");
const User = require("../models/User"); // Adjust the path as necessary
const { userModelData } = require("./userData");
const bcrypt = require("bcryptjs");

const dbURI =
  "mongodb+srv://admaloch:Kik0d0ggie246810@cluster0.5ji8t1s.mongodb.net/MoviesDB?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
  } catch (err) {
    console.log(err);
  }
};

const seedDB = async () => {
  try {
    await connectDB(); // Connect to the database

    for (let userItem of userModelData) {
      const hashedPwd = await bcrypt.hash(userItem.password, 10); // salt rounds

      const user = new User({
        username: userItem.username,
        email: userItem.email,
        password: hashedPwd,
        likedMovies: userItem.likedMovies,
        reviews: [],
      });
      await user.save();
    }
    console.log("Data seeded successfully");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    mongoose.connection.close(); // Ensure connection is closed
  }
};

// Run the script
seedDB();
