import React from "react"
import { requestAlliance, rejectAlliance, withdrawAllianceRequest, getAllianceRole } from "../services/alliances"
import { useState } from "react"
import ForgeAllianceButton from "./ForgeAllianceButton"

const AllianceRequestButton = (props) => {
    const { _id, status, role } = props
    const [requested, request] = useState(() => {
        return status === "pending"
    })

    const sendRequest = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                throw new Error("No token found.")
            }
            const response = await requestAlliance(token, _id)
            console.log("Alliance requested", response);
            request(true)
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
            const response = await withdrawAllianceRequest(token, _id)
            console.log("Alliance request withdrawn", response);
            request(false) 
        } catch (error) {
            console.log("Error withdrawing alliance request")
        }
    }

    const rejectRequest = async () => {
        try {
            const token = localStorage.getItem("token")
            if(!token) {
                throw new Error("No token found.")
            }
            const response = await rejectAlliance(token, _id)
            console.log("Alliance request rejected", response);
            request(false)
        } catch (error) {
            console.log("Alliance request rejected")
        }
    }
    
    return (
        <div>
        {requested && role==="receiver" && (
            <div>
                <p>This user has already requested an alliance!</p>
                <ForgeAllianceButton _id={_id}/> <br></br>
                <button onClick={rejectRequest}>Reject alliance request!</button>
            </div>
        )}
        {requested && role==="sender" && (
            <div>
                <p>Sire, you proposed an alliance with this user already!</p>
                <button onClick={withdrawRequest}>Withdraw alliance request?</button>
            </div>
        )}   
        {!requested && <button onClick={sendRequest}>Request?</button>}
        </div>
    );
};



export default AllianceRequestButton