const mongoose = require("mongoose");
const { Schema, Types} = mongoose;


const UserSchema = new Schema({
  // createdAt: {type: Date, default: Date.now()},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  location: { type: String },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  profilePicture: {type: String, default: ""},
  alliances: [{ type: Types.ObjectId, ref: "User" }],
  posts: [{ type: Types.ObjectId, ref: "Post" }],
}, {
  timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
