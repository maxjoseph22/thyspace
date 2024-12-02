import { useState, useEffect } from "react";
import {getUserById, updateUser, deleteUser} from "../../services/users";
import UserCard from "../../components/MyProfile/UserCard";
import { getPayloadFromToken } from "../../services/helperFunctions";
import EditProfile from "../../components/MyProfile/editProfile";
import NavBar from "../Nav/NavBar";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const[editing, setEditing] = useState(false);

    useEffect(() => {
        fetchUser();
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


    return (
        <>
            <NavBar />
            <h2>Current User</h2>
            <div>
                {error && <p className="error-message">{error}</p>}
                {user ? (
                    <>
                        <UserCard key={user.id} user={user} />
                        {!editing && <button onClick={deleteUserProfile}>Delete</button>}
                        {!editing && <button onClick={() => setEditing(true)}>Update</button>}
                        {editing && ( <EditProfile user={user} onSave={updateUserProfile} onCancel={() => setEditing(false)} /> )}
                            </>
                    ) : (
                        <p>No user found or you are not logged in</p>
                    )}
            </div>
        </>
    );
}

export default MyProfile