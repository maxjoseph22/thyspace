const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  createdAt: {type: Date, default: Date.now()},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  location: { type: String },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  profilePicture: {type: String, default: ""},
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
