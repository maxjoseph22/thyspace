import Comment from "./Comment"
import CommentForm from "./CommentForm"

function CommentContainer( { comments, setPosts, postId } ) {
    return (
        <>
        <CommentForm postId={postId} setPosts={setPosts}/>
        {comments && comments.map(comment => {
            return <Comment key={comment._id} comment={comment} setPosts={setPosts} postId={postId}/>
        })}
        </>
    )
}

export default CommentContainer;