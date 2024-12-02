const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const CommentSchema = new Schema ({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    content: {type: String, required: true},
    likes: [],
    postId: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true}
}, {timestamps: true})

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;