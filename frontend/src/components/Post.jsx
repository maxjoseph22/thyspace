import { deletePost } from "../services/posts";
import { getPayloadFromToken, convertDate } from "../services/helperFunctions";
import { useState } from "react";
import './Post.css'

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
        return decodedpayload.user_id === post.user_id._id
    }

    // allows the input field to be edited
    const handleUpdateInput = (e) => {
        setUpdateInput(e.target.value);
    }



    const checkIfEdited = () => {
        return post.createdAt === post.updatedAt
    }

    // renders the post, with conditional rendering of Update and Delete buttons
    return (
        <div className="post">
            <div className="whole-post">
            <div className="post-header">
                <div className="user-info">
                    <div className="picture">
                        <p>{post.user_id.profilePicture ? post.user_id.profilePicture: 'Temporary'}</p>
                    </div>
                    <div className="username-date">
                        <p className="post-username">{post.user_id.username}</p>
                        <p className="post-date">{convertDate(post)}</p>
                    </div>
                </div>
                {createdByCurrentUser() ?
                        (update ?
                        <div className="post-btns">
                            <button
                            onClick={() => { 
                                sendUpdate(post._id, updateInput);
                                setUpdate(false)}}>Submit</button>
                            <button
                            onClick={() => {
                                setUpdateInput(post.message)
                                setUpdate(false)
                            }}
                            >Undo</button>
                        </div>
                        :
                        <div className="post-btns">
                            <button
                            onClick={() => {setUpdate(true)}}>
                            Update</button>
                            <button
                            onClick={removePost}
                            >Delete</button>
                            </div>)
                    :
                    null
            }
            </div>
            <div className="post-main-content">
                <div className="main-content-header">
                    <p className="edited-tag">{checkIfEdited() ? null: 'Edited'}</p>
                </div>
                <div className="main-content">
                    {update ? 
                    <input
                    value={updateInput}
                    onChange={handleUpdateInput}/>
                    :
                    <p>{post.message}</p>}
                </div>
            </div>
            <div className="post-int-btns">
                <button>Like</button>
                <button>Comment</button>
            </div>
            <div className="post-cmts"></div>

        </div>
        </div>
    )
}

export default Post;