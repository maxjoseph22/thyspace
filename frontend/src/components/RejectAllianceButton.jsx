import { rejectAlliance } from "../services/alliances"

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
            const response = await rejectAlliance(token, _id)
            console.log("Alliance Rejected", response);
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
        <button onClick={() => {
            handleClick()
        }}
        >Reject this alliance request</button>
    );
};

export default RejectAllianceButton