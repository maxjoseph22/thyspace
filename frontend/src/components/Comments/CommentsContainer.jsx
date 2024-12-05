import Comment from "./Comment"
import CommentForm from "./CommentForm"
import { useState } from "react"

function CommentContainer( { comments, setPosts, postId } ) {
    const [ viewComments, setViewComments ]= useState(false)
    return (
        <>
            {
                viewComments ?
                <button
                onClick={() => setViewComments(false)}
                >Hide Comments</button>
                :
                <button
                onClick={() => setViewComments(true)}
                >Show Comments</button>
            }
        {
        viewComments && 
            <>
                <CommentForm postId={postId} setPosts={setPosts}/>
                {
                    comments &&  comments.map(comment => {
                    return <Comment key={comment._id} comment={comment} setPosts={setPosts} postId={postId}/>
                    })
                }
            </>
        }

        </>
    )
}

export default CommentContainer;