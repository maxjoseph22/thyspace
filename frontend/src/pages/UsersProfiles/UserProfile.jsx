import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/users";
import NavBar from "../Nav/NavBar";
import { getPostsById } from "../../services/posts";
import PostContainer from "../../components/PostContainer";
import { getPayloadFromToken } from "../../services/helperFunctions";
import "./UserProfile.css"
import Shield from "../../assets/Shield.png"

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");

            if (token && userId) {
                const data = await getPostsById(userId, token);
                setPosts(data.posts);
                setError(null);
            } else {
                throw new Error("Please log in");
            }
        } catch (err) {
            setError(err.message);
            console.error("Unable to find posts:", err);
        }
    }, [userId]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const currentUserId = await getPayloadFromToken(token).user_id;

                if (currentUserId === userId) {
                    navigate('/myprofile', { replace: true });
                    return;
                }

                const data = await getUserById(userId, token);
                setUser(data.user);
            } catch (err) {
                setError(err.message);
            }
        };

        if (userId) {
            fetchUserProfile();
            fetchPosts();
        }
    }, [userId, navigate, fetchPosts]);

    useEffect(() => {
        document.body.classList.add("my-profile-background");
        return () => {
            document.body.classList.remove("my-profile-background");
        };
    }, []);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <>
            <NavBar profileInfo={user} />
            <div className="my-profile">
                <div className="left-panel">
                    {user ? (
                        <div className="profile-container">
                            <div className="profile-image-container">
                                <img
                                    src={Shield}
                                    alt="Shield"
                                    className="shield-overlay"
                                />
                                <img className="avatar-image"
                                    src={user.profilePicture || "http://via.placeholder.com/150"}
                                    alt={`${user.firstname || 'User'}'s Profile Pic`}
                                />
                                <h3>{user.firstname} {user.lastname}</h3>
                                <p>{user.location}</p>
                            </div>
                        </div>
                    ) : (
                        <p>User not found.</p>
                    )}
                </div>
                <div className="post-content">
                    <div className="post-section">
                        <h3>{user?.firstname || "User"}'s Posts</h3>
                        {posts.length > 0 ? (
                            <PostContainer posts={posts} setPosts={setPosts} />
                        ) : (
                            <p>No posts available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
