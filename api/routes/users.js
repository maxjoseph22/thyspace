const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.get('/', UsersController.getUsers)
router.post("/", UsersController.createUser);
router.delete("/:id", UsersController.deleteUser);
router.put("/:id", UsersController.updateUser);
router.get("/:id", UsersController.findUser);

module.exports = router;
