import { useState, useEffect } from "react";
import {getUserById, updateUser, deleteUser} from "../../services/users";
import UserCard from "../../components/UserCard";
import { getPayloadFromToken } from "../../services/helperFunctions";
import EditProfile from "../../components/MyProfile/EditProfile";
import NavBar from "../Nav/NavBar";
import { getPostsById } from "../../services/posts";
import PostContainer from "../../components/PostContainer";
import { viewForgedAlliances } from "../../services/alliances";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const[editing, setEditing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [alliances, setAlliances] = useState([]);

    useEffect(() => {
        fetchUser();
        fetchPosts();
        fetchAlliances();
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

    const fetchAlliances = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Please log in");

            const data = await viewForgedAlliances(token); // Fetch alliances
            console.log("Alliances data:", data.alliances);
            setAlliances(data.alliances); // Update the alliances state
            setError(null);
        } catch (err) {
            setError(err.message);
            console.log("Unable to fetch alliances:", err);
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
            setUser({...updatedUser.user});
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
            if (token && userId) {
                const data = await getPostsById(userId, token)
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
                        {editing && ( 
                            <EditProfile 
                                user={user} 
                                onSave={updateUserProfile} 
                                onCancel={() => setEditing(false)} 
                            /> 
                        )}
                        
                        <div>
                            <h3>Your Alliances</h3>
                            {console.log("Alliances state:", alliances)}
                            {alliances && Array.isArray(alliances) && alliances.length > 0 ? (
    <div>
        {alliances.map(alliance => (
            <div key={alliance._id}>
                <p>{alliance.firstname} {alliance.lastname}</p>
            </div>
        ))}
    </div>
) : (
    <p>No alliances forged yet</p>
)}
                            
                        </div>
    
                        {posts.length > 0 && <PostContainer posts={posts} setPosts={setPosts} />}
                    </>
                ) : (
                    <p>No user found or you are not logged in</p>
                )}
            </div>
        </>
    );



    
}

export default MyProfile