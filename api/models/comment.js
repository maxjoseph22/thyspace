const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const CommentSchema = new Schema ({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    content: {type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, {timestamps: true})

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;