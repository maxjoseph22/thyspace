const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

async function getAllComments(req, res){
    const comments = await Comment.find();
    const token = generateToken(req.userId);
    res.status(200).json({comments: comments, token: token});
}

async function createComment(req, res){
    const comment = new Comment(req.body);
    comment.save();

    const newToken = generateToken(req.userId);
    res.status(201).json({comment: comment, token: newToken});

}

async function editComment(req, res){
    const {id} = req.params;
    const comment = await Comment.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    console.log(req.body);
    const newToken = generateToken(req.userId);
    res.status(202).json({comment: comment, token: newToken});
}

async function deleteComment(req, res){
    const {id} = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    const newToken = generateToken(req.userId);
    res.status(200).json({comment: comment, token: newToken});
}

const CommentsController = {
    getAllComments: getAllComments,
    createComment: createComment,
    editComment: editComment,
    deleteComment: deleteComment
};

module.exports = CommentsController;