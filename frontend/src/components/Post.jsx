import { deletePost } from "../services/posts";
import { getPayloadFromToken } from "../services/helperFunctions";

function Post({ post, setPosts }) {
  
  const removePost = async () => {
    const token = localStorage.getItem("token");
    const postToRemove = await deletePost(post._id, token)
    await setPosts((prev) => {
      const newArray = prev.filter(post => {
        return post._id !== postToRemove.post._id
      })
      return [...newArray]
    })
    localStorage.setItem('token', postToRemove.token)
  }

  const createdByCurrentUser = () => {
    const token = localStorage.getItem("token")
    const decodedpayload = getPayloadFromToken(token)
    return decodedpayload.user_id === post.user_id
  }

  return (
    <div className="post">
      {post.message}
        { createdByCurrentUser() ?
          <div className="post-btns">
            <button>Update</button>
            <button
            onClick={removePost}
            >Delete</button> 
          </div>
          :
          null
      }
    </div>
  )
}

export default Post;
