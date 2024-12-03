import { useState, useEffect } from "react";
import {getUserById, updateUser, deleteUser} from "../../services/users";
import UserCard from "../../components/UserCard";
import { getPayloadFromToken } from "../../services/helperFunctions";
import EditProfile from "../../components/MyProfile/editProfile";
import NavBar from "../Nav/NavBar";
import { getPostsById } from "../../services/posts";
import PostContainer from "../../components/PostContainer";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const[editing, setEditing] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchUser();
        fetchPosts();
    }, [])


    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token")
            const userId = await getPayloadFromToken(token).user_id

            if(token && userId) {
                const data = await getUserById(userId, token);
                setUser(data.user);
                setError(null)
            } else {
                throw new Error("Please log in")
            }

        } catch (err) {
            setError(err.message)
        }
    };

    const deleteUserProfile = async () => {
        if (!user || !user._id) {
            setError("User data is not loaded.");
            return;
        }
            try{
                const token = localStorage.getItem('token')

                if (window.confirm("Warning! Are you sure you want to delete your profile?")){
                    const response = await deleteUser(user._id, token);
                    console.log("Delete message:", response)
                    alert("Your profile has been deleted")

                    localStorage.removeItem("token");
                    setUser(null)
                    setError(null)
                    window.location.href = "/"
                }

            } catch (err) {
                setError(err.message)
            }
        
        
    };

    const updateUserProfile = async (updatedProfile) => {
        if (!user || !user._id) {
            setError("User data is not loaded.");
            return;
        }

        try {
            const token = localStorage.getItem("token")
            const updatedUser = await updateUser(user._id, updatedProfile, token)
            console.log("Updated user object:", updatedUser)
            setUser(updatedUser);
            setEditing(false);
            setError(false)
            alert("Your profile has been updated")
        } catch (err) {
            setError(err.message)
        }
    };

    const fetchPosts = async () => {
        try{
            const token = localStorage.getItem("token")
            const userId = await getPayloadFromToken(token).user_id
            console.log(token)
            console.log(userId)
            if (token && userId) {
                const data = await getPostsById(userId, token)
                console.log("Fetched posts", data.posts)
                setPosts(data.posts)
                setError(null) 
            } else {
                throw new Error("please log in")
            }
            
        } catch (err) {
            setError(err.message)
            console.log("Unable to find posts:", err)
        }

    }


    return (
        <>
            <NavBar />       
            <div>
                {error && <p className="error-message">{error}</p>}
                {user ? (
                    <>
                        <h2>{user.firstname} Page</h2>
                        <UserCard key={user.id} user={user} />
                        {!editing && <button onClick={deleteUserProfile}>Delete</button>}
                        {!editing && <button onClick={() => setEditing(true)}>Update</button>}
                        {editing && ( <EditProfile user={user} onSave={updateUserProfile} onCancel={() => setEditing(false)} /> )}
                        { posts.length > 0 && <PostContainer posts={posts} setPosts={setPosts} /> }
                            </>
                    ) : (
                        <p>No user found or you are not logged in</p>
                    )}
            </div>
        </>
    );
}

export default MyProfile