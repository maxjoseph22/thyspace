import { deleteComment, updateComment } from "../../services/comments";
import { getPayloadFromToken } from "../../services/helperFunctions";
import { useState } from "react";   
import Like from "../Like";
import './Comment.css'

function Comment({ comment, setPosts, postId }) {
    const [ update, setUpdate ] = useState(false)
    const [ updateInput, setUpdateInput ] = useState(comment.content)
    const sendDeleteComment = async () => {
        const token = localStorage.getItem('token')
        const deletedComment = await deleteComment(postId, comment._id, token)
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post._id === postId){
                    const newCommentsArray = post.comments.filter(comment => comment._id !== deletedComment.comment._id)
                    return {
                        ...post,
                        comments: [...newCommentsArray]
                    }
                } else return post
            })
        })
    }

    const handleCommentUpdate = (e) => {
        setUpdateInput(e.target.value)
    }

    const createdByCurrentUser = () => {
        const token = localStorage.getItem('token')
        const decodedpayload = getPayloadFromToken(token)
        return comment.userId._id === decodedpayload.user_id
    }

    const submitCommentChanges = async () => {
        const token = localStorage.getItem('token')
        const newComment = await updateComment(postId, comment._id, updateInput, token)
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post._id === postId){
                    const commentIndex = post.comments.findIndex(comment => comment._id === newComment.comment._id)
                    post.comments[commentIndex] = newComment.comment
                    return {
                        ...post,
                        comments: [...post.comments]
                    }
                } else return post
            })
        })
        setUpdate(false)
    }

    const handleLikeUpdate = (updatedData) => {
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post._id === postId) {
                    const updatedComments =  post.comments.map(c => {
                        return c._id === comment._id ? { ...c, likes: updatedData.likes} : c
                    })
                    return { ...post, comments: updatedComments}
                } else return post 
            })
        })
    }

    const checkIfEdited = () => {
        return !comment.isEdited
    }


    return (
        <>
        {comment.userId.profilePicture && <img src={comment.userId.profilePicture} />}
        <p>{comment.userId.username}</p>
        <div className="main-content-header">
            <p className="edited-tag">{checkIfEdited() ? null: 'Edited'}</p>
        </div>
        {update? 
        <input value={updateInput}
        onChange={handleCommentUpdate}
        className="update-comment"
        />
        :
        <p>{comment.content}</p>}

        <Like  entity={comment} setPosts={setPosts} handleLikeUpdate={handleLikeUpdate} entityType='Comment' />

        {createdByCurrentUser() && 
        ( update ?
            <div className="submit-undo">
                <button onClick={submitCommentChanges}
                className="comment-buttons"
                >
                    Submit
                    </button>
                <button onClick={
                    () => {    
                        setUpdateInput(comment.content)
                        setUpdate(false)
                    }
                }
                className="comment-buttons"
                >Undo</button>
            </div>
            :
            <div className="update-delete">
                <button onClick={() => setUpdate(true)}
                    className="comment-buttons"
                    >Update</button>
                <button onClick={sendDeleteComment}
                className="comment-buttons"
                >Delete</button>
            </div>
        )
        }
        </>
    )
}

export default Comment;