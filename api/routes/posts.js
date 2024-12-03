const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const CommentsController = require("../controllers/comments");

router.post("/:postId/comments", CommentsController.createComment);
router.put("/:postId/comments/:commentId", CommentsController.editComment);
router.delete("/:postId/comments/:commentId", CommentsController.deleteComment);

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.put("/:id", PostsController.updatePost);
router.delete("/:id", PostsController.deletePost);




module.exports = router;
