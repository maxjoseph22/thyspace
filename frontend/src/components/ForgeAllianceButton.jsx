import { forgeAlliance } from "../services/alliances"
import "./forgeAllianceButton.css";


const ForgeAllianceButton = (props) => {
    const { _id, setLocalStatus } = props

    
    
    const handleClick = async () => {
        const audio = new Audio('/acceptAlliance.mp3');
        audio.volume = 0.5;
        audio.play();

        try {
            const token = localStorage.getItem("token");
            if(!token) {
                throw new Error("No token found")
            }
            await forgeAlliance(token, _id)
            setLocalStatus("accepted")
            alert("⚔️🛡️ Alliance forged! Let the banners rise!");
            // window.location.reload();
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
        <div className="forge">
        <button onClick={handleClick}>Complete the forging of this alliance?</button>
        </div>
    );
};

export default ForgeAllianceButton