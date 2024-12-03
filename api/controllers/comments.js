const Comment = require("../models/comment");
const Post = require("../models/post");
const { ObjectId } = require("mongoose")
const { generateToken } = require("../lib/token");

async function getAllComments(req, res){
    const comments = await Comment.find();
    const token = generateToken(req.userId);
    res.status(200).json({comments: comments, token: token});
}

async function createComment(req, res){
    const {postId} = req.params
    const {content, userId} = req.body
    const comment = new Comment({
        userId: userId,
        content: content,
    });
    await comment.save();
    
    // add comment Id reference into specific post document 
    const post = await Post.findById(postId)
    post.comments.push(comment._id)
    await post.save()
    
    const newToken = generateToken(req.userId);
    res.status(201).json({comment: comment, token: newToken});
}

async function editComment(req, res){
    const {commentId} = req.params;
    const comment = await Comment.findByIdAndUpdate(commentId, {$set: req.body}, {new: true});
    // console.log(req.body);
    const newToken = generateToken(req.userId);
    res.status(202).json({comment: comment, token: newToken});
}

async function deleteComment(req, res){

    // get both ids from parama (they are strings)
    const { postId, commentId } = req.params;

    // find and remove comment and store removed comment in commentToRemove variable
    const commentToRemove = await Comment.findByIdAndRemove(commentId);
        if (!commentToRemove) {
            return res.status(404).json({message: "Comment not found"})
        }

    // find post which has comment to be removed
    const postToUpdate = await Post.findById(postId)

    if (!postToUpdate) {
        return res.status(404).json({message: "Post not found"})
    }

    // filter post comments and return all comments that don;t match the id of deleted comment
    // use equals() instead of !== to compare objects Ids
    postToUpdate.comments = postToUpdate.comments.filter((comment) => {
        return !comment.equals(commentToRemove._id)
    })

    // put the jar back on the shelf
    await postToUpdate.save()

    const newToken = generateToken(req.userId);
    res.status(200).json({comment: commentToRemove, token: newToken});
}

const CommentsController = {
    getAllComments: getAllComments,
    createComment: createComment,
    editComment: editComment,
    deleteComment: deleteComment
};

module.exports = CommentsController;