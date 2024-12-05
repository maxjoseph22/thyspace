import { forgeAlliance } from "../services/alliances"


const ForgeAllianceButton = (props) => {
    const { _id } = props

    
    
    const handleClick = async () => {
        const audio = new Audio('/acceptAlliance.mp3');
        audio.volume = 0.5;
        audio.play();

        try {
            const token = localStorage.getItem("token");
            if(!token) {
                throw new Error("No token found")
            }
            const response = await forgeAlliance(token, _id)
            console.log("Alliance Forged", response);
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
        <button onClick={handleClick}>Complete the forging of this alliance?</button>
    );
};

export default ForgeAllianceButton