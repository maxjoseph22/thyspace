import PotentialAllianceContainer from '../../components/PotentialAllianceContainer'
import { useEffect, useState } from 'react'
import { getUsers } from '../../services/users'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Nav/NavBar'
import { viewPotentialAlliances, viewSpecificPotentialAlliances } from "../../services/alliances"
import "./FindAlliances.css";

const FindAlliance = () => {
    const [everyUser, setEveryUser] = useState([])
    const [ searchBy, setSearchBy ] = useState({
        searchArea: 'firstname',
        searchCriteria: ''
    })
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

    useEffect(() => {
        document.body.classList.add("find-alliances-background");
        return () => {
            document.body.classList.remove("find-alliances-background");
        };
    }, [])

    const submitSearch = async () => {
        if(searchBy.searchCriteria.trim() !== ''){
            const token = localStorage.getItem('token')
            const data = await viewSpecificPotentialAlliances(searchBy, token)
            setEveryUser(data.usersWithAlliancesData)
        }
    }

    const handleOptionChange = (e) => {
        setSearchBy({...searchBy, [e.target.name]: e.target.value})
    }

    return (
        <>
            <NavBar />
            <div Class="title">
            <h1>Find Alliances</h1>
            <select 
            name='searchArea'
            onChange={handleOptionChange}
            >
                <option value='firstname'>First Name</option>
                <option value='lastname'>Last Name</option>
                <option value='location'>Location</option>
            </select>
            <input 
            name='searchCriteria'
            type='text'
            placeholder="Search for alliances"
            onChange={handleOptionChange}
            value={searchBy.searchCriteria}
            />
            <button onClick={submitSearch}>Search</button>
            <PotentialAllianceContainer users={everyUser}/>
            </div>
        </>
    )
}

export default FindAlliance