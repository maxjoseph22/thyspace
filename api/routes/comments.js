const express = require("express");
const router = express.Router();

const CommentsController =  require("../controllers/comments");

router.get("/", CommentsController.getAllComments);
router.post("/", CommentsController.createComment);
router.put("/:id", CommentsController.editComment);
router.delete("/:id", CommentsController.deleteComment);

module.exports = router;