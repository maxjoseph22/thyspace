import { forgeAlliance } from "../services/alliances"
import "./forgeAllianceButton.css";


const ForgeAllianceButton = (props) => {
    const { _id } = props
    
    const handleClick = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                throw new Error("No token found")
            }
            const response = await forgeAlliance(token, _id)
            console.log("Alliance Forged", response);
            alert("⚔️🛡️ Alliance forged! Let the banners rise!");
            window.location.reload();
        } catch (error) {
            console.error("Error forging alliance:", error)
        }
    }
    return (
        <div className="forge">
        <button onClick={handleClick}>Complete the forging of this alliance?</button>
        </div>
    );
};

export default ForgeAllianceButton