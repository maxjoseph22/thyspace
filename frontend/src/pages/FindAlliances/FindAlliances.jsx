import PotentialAllianceContainer from '../../components/PotentialAllianceContainer'
import { useEffect, useState } from 'react'
import { getUsers } from '../../services/users'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Nav/NavBar'
import { viewPotentialAlliances } from "../../services/alliances"

const FindAlliance = () => {
    const [everyUser, setEveryUser] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchPotentialAlliances = async () => {
            const token = localStorage.getItem("token");
            const loggedIn = token !== null;
            if (loggedIn) {
                try {
                const data = await viewPotentialAlliances(token)
                setEveryUser(data.usersWithAlliancesData)
                } catch (error) {
                    console.log(error)
                    navigate('/login')
                }
            }
        }
        fetchPotentialAlliances();
    }, [navigate])
    return (
        <>
            <NavBar />
            <h1>Find Alliances</h1>
            <PotentialAllianceContainer users={everyUser}/>
        </>
    )
}

export default FindAlliance