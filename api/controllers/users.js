const User = require("../models/user");

// createUser function
async function createUser(req, res) {
  try {
    const {
      username,
      email,
      password,
      location,
      firstname,
      lastname,
      profilePicture,
      alliances = [],
      posts = [],
    } = req.body;

  if (!username || !email || !password || !firstname || !lastname) {
    return res.status(400).json({ message: "All required fields must be filled"})
  }
  const user = new User({
    email, 
    password, 
    username, 
    location, 
    firstname,
    lastname,
    profilePicture,
    alliances,
    posts });

    const savedUser = await user.save()

    if (!savedUser) {
      return res.status(409).json({message: "User already exists"})
    }
    res.status(201).json({message: "User successfully created!"})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unexpected server error" });
  }
  }

// delete function
async function deleteUser(req, res) {
  try {
    const userId = req.params.id
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({message: "User deleted", user: deletedUser}) 
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error" });
}
};

// update function
async function updateUser(req, res) {
  try {
    const updates = req.body
    const updateUser = await User.findByIdAndUpdate(req.params.id, updates, {new: true})
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({message: "User updated", user: updateUser}) 
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error" });
}
};

// findBy function
async function findUser(req, res) {
  try {
    const userID = req.params.id
    const foundUser = await User.findById(userID)
    if (!foundUser) {
      return res.status(404).json({message: "User not found"})
    }
    res.status(200).json({message: "User found", user: foundUser})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unexpected server error" });
  }
}

const UsersController = {
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  findUser: findUser,
};

module.exports = UsersController;
