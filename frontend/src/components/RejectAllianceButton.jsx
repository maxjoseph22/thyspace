import { rejectAlliance } from "../services/alliances"
import "./RejectAllianceButton.css";

const RejectAllianceButton = (props) => {
    const { _id } = props

    const handleClick = async () => {
        const audio = new Audio('/declineAlliance.mp3');
        audio.volume = 0.5;
        audio.play();
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                throw new Error("No token found")
            }
            await rejectAlliance(token, _id)
            alert("❌ Alliance rejected! 🪓 To the battlefield!");
            updateScreen()
        } catch (error) {
            console.error("Error forging alliance:", error)
        }
    }

    const updateScreen = () => {
        props.setUsers(prevUsers => {
            const filteredUsers = prevUsers.filter(user => user._id !== props._id)
            return [...filteredUsers]
        })
    }

    return (

        <div className="no-forge">
        <button onClick={handleClick}>Reject this alliance request</button>
        </div>
    );
};

export default RejectAllianceButton