import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/users";
import UserCard from "../../components/UserCard";
import NavBar from "../Nav/NavBar";
import { getPayloadFromToken } from "../../services/helperFunctions";

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

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
        }
    }, [userId, navigate]);

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