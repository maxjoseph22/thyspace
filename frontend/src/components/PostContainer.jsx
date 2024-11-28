import Post from "./Post"
import { updatePost } from "../services/posts";

const PostContainer = ({ posts, setPosts }) => {

    const sendUpdate = async (postId, updateInput) => {
        const token = localStorage.getItem("token");
        // backend function actually updates
        const response = await updatePost(postId, updateInput, token);
        // finding the index of the updated one so we can update it frontend
        const index = posts.findIndex(post => {
            return post._id === response.post._id;
        })
        // updating it frontend
        posts[index] = response.post;
        // rerendering
        setPosts([...posts]);
      }

    return (
        <div> 
            {
                posts.map(post => {
                    return <Post post={post} setPosts={setPosts} key={post._id} sendUpdate={sendUpdate}/>
                })
            }
        </div>
    )
}



export default PostContainer