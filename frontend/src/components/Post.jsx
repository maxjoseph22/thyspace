import { deletePost } from "../services/posts";
import { getPayloadFromToken } from "../services/helperFunctions";
import { useState } from "react";

function Post({ post, setPosts, sendUpdate }) {
    const [update, setUpdate] = useState(false); 
    const [updateInput, setUpdateInput] = useState(post.message);

    const removePost = async () => {
    const token = localStorage.getItem("token");

    const postToRemove = await deletePost(post._id, token)

    // makes the new list of posts without the one deleted..
    await setPosts((prev) => {
        // ..by filtering to show all but the one deleted
        const newArray = prev.filter(post => {
            return post._id !== postToRemove.post._id
        })
        // returns newArray with all elements split into objects (spread)
        return [...newArray];
    })
    // updates the token, resetting the timer
    localStorage.setItem('token', postToRemove.token)
    }

    // checks if the current user_id matches the post's user_id
    const createdByCurrentUser = () => {
        const token = localStorage.getItem("token")
        const decodedpayload = getPayloadFromToken(token)
        return decodedpayload.user_id === post.user_id
    }

    // allows the input field to be edited
    const handleUpdateInput = (e) => {
        setUpdateInput(e.target.value);
    }

    // renders the post, with conditional rendering of Update and Delete buttons
    return (
        <div className="post">
        {
            update ?
            <input
            value={updateInput}
            onChange={handleUpdateInput}/>
            :
            <p>{post.message}</p>
        }
        {
            createdByCurrentUser() ?
            <div className="post-btns">
            {
                update ?
                <button
                onClick={() => { 
                    sendUpdate(post._id, updateInput);
                    setUpdate(false)}}>Submit</button>
                :
                <div>
                    <button
                    onClick={() => {setUpdate(true)}}>
                    Update</button>
                <button
                onClick={removePost}
                >Delete</button>
                </div>
            }
            </div>
            :
            null
        }
        </div>
    )
}

export default Post;