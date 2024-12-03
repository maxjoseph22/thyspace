import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { viewReceivedRequests } from "../../services/alliances"
import { getPayloadFromToken } from "../../services/helperFunctions";
import AllianceRequestContainer from '../../components/AllianceRequestsViewContainer'
import NavBar from "../Nav/NavBar";

export function DiplomacyPage() {
    const [receivedRequests, setReceivedRequests] = useState([]);
    const navigate = useNavigate

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem("token")
            const loggedIn = token !== null;
            if (loggedIn) {
                try {
                    const data = await viewReceivedRequests(token)
                    setReceivedRequests(data.usersThatRequested)
                } catch (error) {
                    console.log(error);
                    navigate("/login");
                }
            }
        }
        fetchRequests();
    }, [navigate]);
    // TODO look into appropriate dependency array
    return (
        <>
        <NavBar />
            <h1>New allies flock to our flanks!</h1>
            <img src="https://c.tenor.com/43cc01Cj1JkAAAAd/tenor.gif" alt="Fun GIF"></img>
            <h2>friend or foe?</h2>
                <AllianceRequestContainer users={receivedRequests}/>
        </>
    )
}