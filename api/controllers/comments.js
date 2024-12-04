const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require('../models/like')
const { generateToken } = require("../lib/token");

async function createComment(req, res){
    const {postId} = req.params
    const {content, userId} = req.body
    const comment = new Comment({
        userId: userId,
        content: content,
    });
    await comment.save()
    
    // add comment Id reference into specific post document 
    const post = await Post.findById(postId)
    post.comments.push(comment._id)
    await post.save()
    const populatedComment = await Comment.findById(comment._id).populate("userId", 'username profilePicture');
    const newToken = generateToken(req.userId);
    res.status(201).json({comment: populatedComment, token: newToken});
}

async function editComment(req, res){
    const {commentId} = req.params;
    const comment = await Comment.findByIdAndUpdate(commentId, { $set: {...req.body, isEdited: true} }, {new: true}).populate("userId", 'username profilePicture')
    .populate({
        path: 'likes',
        select: 'username userId',
        model: 'User'
    });
    
    const newToken = generateToken(req.userId);
    res.status(202).json({comment: comment, token: newToken});
}

async function deleteComment(req, res){

    // get both ids from parama (they are strings)
    const { postId, commentId } = req.params;
    await Like.deleteMany({ entityId: commentId})
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
    res.status(202).json({comment: commentToRemove, token: newToken});
}

const CommentsController = {
    createComment: createComment,
    editComment: editComment,
    deleteComment: deleteComment
};

module.exports = CommentsController;