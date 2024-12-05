import { deletePost } from "../services/posts";
import { getPayloadFromToken, convertDate } from "../services/helperFunctions";
import { useState } from "react";
import './Post.css'
import { FaPencilAlt, FaUndo } from "react-icons/fa";
import { IoMdClose, IoMdSend } from "react-icons/io";
import Like from "./Like";
import CommentsContainer from "./Comments/CommentsContainer";
import { Link } from "react-router-dom";

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
        return !post.isEdited
    }

    const handleLikeUpdate = (updatedData) => {
        setPosts(prevPosts => prevPosts.map(p => {
            return p._id === post._id ? { ...p, likes: updatedData.likes} : p
        }))
    }
    

    // renders the post, with conditional rendering of Update and Delete buttons
    return (
        <div className="post">
            <div className="whole-post">
            <div className="post-header">
                <div className="user-info">
                    <div className="picture">
                        {post.user_id.profilePicture ? <img src={post.user_id.profilePicture} />: <p>Temporary</p>}
                    </div>
                    <div className="username-date">
                        <Link to={`/userprofile/${post.user_id._id}`}>
                        <p className="post-username">{post.user_id.username}</p>
                        </Link>
                        <p className="post-date">{convertDate(post)}</p>
                    </div>
                </div>
                {createdByCurrentUser() ?
                        (update ?
                        <div className="post-btns">
                            {/* <button
                            onClick={() => { 
                                sendUpdate(post._id, updateInput);
                                setUpdate(false)}}>Submit</button> */}
                            <IoMdSend 
                            onClick={() => { 
                                sendUpdate(post._id, updateInput);
                                setUpdate(false)}}
                            className="send-update"
                            />
                            {/* <button
                            onClick={() => {
                                setUpdateInput(post.message)
                                setUpdate(false)
                            }}
                            >Undo</button> */}
                            <FaUndo 
                            onClick={() => {
                                setUpdateInput(post.message)
                                setUpdate(false)
                            }}
                            className="undo-update"
                            />
                        </div>
                        :
                        <div className="post-btns">
                            {/* <button
                            onClick={() => {setUpdate(true)}}>
                            Update</button> */}
                            <FaPencilAlt
                            className="edit-post" 
                            onClick={() => {setUpdate(true)}}/>
                            <IoMdClose 
                            onClick={removePost}
                            className="delete-post"
                            />
                            {/* <button
                            onClick={removePost}
                            >Delete</button> */}
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
                    {post.image ? <img src={post.image}/>: null}
                    {update ? 
                    <input
                    className="update-post"
                    value={updateInput}
                    onChange={handleUpdateInput}/>
                    :
                    <p
                    className="post-message"
                    >{post.message}</p>}
                </div>
            </div>

            <div className="post-int-btns">
                <Like  entity={post} setPosts={setPosts} handleLikeUpdate={handleLikeUpdate} entityType='Post'/>
            </div>
            <div className="post-cmts">
                <CommentsContainer comments={post.comments} setPosts={setPosts} postId={post._id} />
            </div>

        </div>
        </div>
    )
}

export default Post;