import { useState } from "react";
import { createComment } from "../../services/comments";
import { getPayloadFromToken } from "../../services/helperFunctions";

const CommentForm = ({ postId, setPosts }) => {
    
    const [comment, setComment] = useState("");

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }
    
    const submitComment = async (event) => {
        event.preventDefault() //stop page from auto-refreshing
        const token = localStorage.getItem("token");
        const userId = getPayloadFromToken(token).user_id
        const commentData = await createComment(comment, postId, userId, token)
        
        setPosts(prevPost => {
            const newComments = [commentData, ...prevPost.comments]
            prevPost.comments = [...newComments]
            return {...prevPost}
        })
    }

    return (
        <form type="submit" onSubmit={submitComment}>
            <textarea 
                type="text" 
                value={comment} 
                onChange={handleCommentChange}
                placeholder="Type your comment here"/>
            <button 
                type="submit">
                Submit Comment
            </button>
        </form>
    )
}
export default CommentForm;