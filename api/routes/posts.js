const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.put("/:id", PostsController.updatePost);
router.delete("/:id", PostsController.deletePost);
router.get("/:id", PostsController.getUserPosts);

module.exports = router;
