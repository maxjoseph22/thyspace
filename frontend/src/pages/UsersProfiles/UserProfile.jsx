import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/users";
import UserCard from "../../components/UserCard";
import NavBar from "../Nav/NavBar";
import { getPostsById } from "../../services/posts";
import PostContainer from "../../components/PostContainer";
import { getPayloadFromToken } from "../../services/helperFunctions";

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);


    const fetchPosts = useCallback(async () => {
        try{
            const token = localStorage.getItem("token")
    
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
    }, [userId]);


    useEffect(() => {
        const fetchUserProfile = async () => {
            try{
                const token = localStorage.getItem("token")
                const currentUserId = await getPayloadFromToken(token).user_id;
                
                if (currentUserId === userId) {
                    navigate('/myprofile', {replace : true});
                    return;
                }

                const data = await getUserById(userId, token)
                setUser(data.user)
            } catch (err) {
                setError(err.message)
            }
        };
        
        if (userId){
            fetchUserProfile();
            fetchPosts();
        }
    }, [userId, navigate, fetchPosts]);

    if (error) {
        return<p>{error}</p>
    }


return (
    <div>
        <NavBar />
        <div>
            {user ? (
                <div>
                    <h2>{user.username} Profile Page</h2>
                    <div>
                        <UserCard key={user._id} user={user} />
                        { posts.length > 0 && <PostContainer posts={posts} setPosts={setPosts} /> }
                    </div>
                </div>
            ) : ( 
                <p>user not found</p>
            )}
        </div>
    </div>
    );
}

export default UserProfile;