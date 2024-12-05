import { rejectAlliance } from "../services/alliances"
import "./RejectAllianceButton.css";


const RejectAllianceButton = (props) => {
    const { _id } = props
    
    const handleClick = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                throw new Error("No token found")
            }
            const response = await rejectAlliance(token, _id)
            console.log("Alliance Rejected", response);
            alert("❌ Alliance rejected! 🪓 To the battlefield!");
            window.location.reload();
        } catch (error) {
            console.error("Error forging alliance:", error)
        }
    }
    return (
        <div className="no-forge">
        <button onClick={handleClick}>Reject this alliance request</button>
        </div>
    );
};

export default RejectAllianceButton