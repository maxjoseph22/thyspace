import { requestAlliance, rejectAlliance, withdrawAllianceRequest, getAllianceRole } from "../services/alliances"
import { useState } from "react"
import ForgeAllianceButton from "./ForgeAllianceButton";
import "./AllianceRequestButton.css";

const AllianceRequestButton = (props) => {
    const { _id, status, role } = props
    const [localStatus, setLocalStatus] = useState(status)
    const [localRole, setLocalRole] = useState(role)
    const [requested, request] = useState(() => {
        return status === "pending"
    })
    const sendRequest = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                throw new Error("No token found.")
            }
            await requestAlliance(token, _id)
            request(true)
            setLocalStatus("pending")
            setLocalRole("sender")
        } catch (error) {
            console.log("Error requesting alliance")
        }
    }
    // Find way to update role with getAllianceRole function
    const withdrawRequest = async () => {
        try { 
            const token = localStorage.getItem("token")
            if(!token) {
                throw new Error("No token found.")
            }
            await withdrawAllianceRequest(token, _id)
            request(false)
            setLocalStatus("none") 
        } catch (error) {
            console.log("Error withdrawing alliance request")
        }
    }
    const rejectRequest = async () => {
        const audio = new Audio('/declineAlliance.mp3');
        audio.volume = 0.5;
        audio.play();
        try {
            const token = localStorage.getItem("token")
            if(!token) {
                throw new Error("No token found.")
            }
            await rejectAlliance(token, _id)
            request(false)
            setLocalStatus("none")
        } catch (error) {
            console.log("Alliance request rejected")
        }
    }
    
    return (
        <div className="reject">
        {localStatus === "accepted" && (
            <h3 className="forged">Alliance forged!</h3>
        )}
        {requested && localRole === "receiver" && localStatus !== "accepted" && (
            <div>
                <p className="alliance-info"> This user sent an envoy!</p>
                <ForgeAllianceButton 
                    _id={_id}
                    setLocalStatus={setLocalStatus}/> <br></br>
                <button onClick={rejectRequest}>Reject this alliance request</button>
            </div>
        )}
        {requested && localRole==="sender" && localStatus !== "accepted" && (
            <div>
                <p className="alliance-info">Envoy dispatched!</p>
                <button onClick={withdrawRequest}>Withdraw alliance request?</button>
            </div>
        )}   
        {!requested && localStatus !== "accepted" && <button onClick={sendRequest}>Request an alliance</button>}
        </div>
    );
};
export default AllianceRequestButton