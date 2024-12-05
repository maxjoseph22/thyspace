import { useState, useEffect } from "react";
import { getUserById, updateUser, deleteUser } from "../../services/users";
import { getPayloadFromToken } from "../../services/helperFunctions";
import EditProfile from "../../components/MyProfile/EditProfile";
import NavBar from "../Nav/NavBar";
import { getPostsById } from "../../services/posts";
import PostContainer from "../../components/PostContainer";
import { viewForgedAlliances } from "../../services/alliances";
import "./MyProfile.css";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [alliances, setAlliances] = useState([]);

    useEffect(() => {
        fetchUser();
        fetchAlliances();
    }, [])

    useEffect(() => {
        fetchPosts();
    }, [user])

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token")
            const userId = await getPayloadFromToken(token).user_id

            if (token && userId) {
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
        try {
            const token = localStorage.getItem('token')

            if (window.confirm("Warning! Are you sure you want to delete your profile?")) {
                await deleteUser(user._id, token);
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
            setUser({ ...updatedUser.user });
            setEditing(false);
            setError(false)
            alert("Your profile has been updated")
        } catch (err) {
            setError(err.message)
        }
    };

    const fetchPosts = async () => {
        try {
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

    useEffect(() => {
        document.body.classList.add("my-profile-background");
        return () => {
            document.body.classList.remove("my-profile-background");
        };
    }, [])

    return (
        <>
            <NavBar profileInfo={user}/>
            <div className="my-profile">
                <div className="left-panel">
                    {error && <p className="error-message">{error}</p>}
                    {editing ? (
                        <EditProfile
                            user={user}
                            onSave={updateUserProfile}
                            onCancel={() => setEditing(false)}
                        />
                    ) : (
                        user ? (
                            <div className="profile-panel">
                                <img
                                    src={user.avatar || "http://via.placeholder.com/150"}
                                    alt={`${user.firstname || 'User'}'s Profile Pic`}
                                />
                                <h2>{user.firstname} {user.lastname}</h2>
                                <p>{user.location}</p>
                                <div className="profile-buttons">
                                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                                    <button onClick={deleteUserProfile}>Delete Profile</button>
                                </div>
                            </div>
                        ) : (
                            <p>No user found or you are not logged in.</p>
                        )
                    )}
                    <div className="alliance-section">
                        <h3>Your Alliances</h3>
                        {alliances.length > 0 ? (
                            alliances.map((alliance) => (
                                <div key={alliance._id}>
                                    <p>
                                        {alliance.firstname} {alliance.lastname}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No alliances found.</p>
                        )}
                    </div>
                </div>
                <div className="post-content">
                    <div className="post-section">
                        <h3>Your Posts</h3>
                        {posts.length > 0 ? (
                            <PostContainer posts={posts} setPosts={setPosts} />
                        ) : (
                            <p>No post available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyProfile