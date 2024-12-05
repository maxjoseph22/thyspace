const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, Types} = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  location: { type: String },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  profilePicture: {type: String, default: 'https://res.cloudinary.com/dnixfhx1v/image/upload/v1733410110/m6s1cxpr0mbzxdggusxe.png'},
  alliances: [{ type: Types.ObjectId, ref: "User" }],
  // posts: [{ type: Types.ObjectId, ref: "Post" }],
}, {
  timestamps: true
});

// password hashing middleware:
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)
    const salt = await bcrypt.genSalt(saltRounds)

    this.password = await bcrypt.hash(this.password, salt)
    next();
  } catch (error) {
    next(error)
  }
});

// Password comparison method:
UserSchema.methods.comparePassword = async function (plainPassword) {
  try{
    const passwordMatch = bcrypt.compare(plainPassword, this.password);
    return passwordMatch;
  } catch (error) {
    throw new Error("Error comparing passwords")
  }
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
