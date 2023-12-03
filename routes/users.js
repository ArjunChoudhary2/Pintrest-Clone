const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/newappdb");
const passportLocalMongoose= require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: {
    type: String, // Assuming it's a URL pointing to the profile picture
    default: "default_profile_pic.jpg", // Default profile picture URL
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
userSchema.plugin(passportLocalMongoose);

module.exports = User;
