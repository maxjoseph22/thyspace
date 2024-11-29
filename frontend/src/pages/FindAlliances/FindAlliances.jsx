import PotentialAllianceContainer from '../../components/PotentialAllianceContainer'
import { useEffect, useState } from 'react'
import { getUsers } from '../../services/users'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Nav/NavBar'

const FindAlliance = () => {
    const [everyUser, setEveryUser] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token");
        const loggedIn = token !== null;
        if (loggedIn) {
            getUsers()
            .then(data => setEveryUser(data.users))
            .catch(err => {
                console.log(err)
                navigate('/login')
            })
        }

    }, [navigate])
    return (
        <>
            <NavBar />
            <h2>Find Alliances</h2>
            <PotentialAllianceContainer users={everyUser}/>
        </>
    )
}

export default FindAlliance