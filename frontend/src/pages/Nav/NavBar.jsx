import { Link } from "react-router-dom"
import LogoutButton from "../../components/LogoutButton"
import './NavBar.css'
import { useEffect, useState } from "react"
import { getUserById } from "../../services/users"
import { getPayloadFromToken } from "../../services/helperFunctions"

const NavBar = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        grabUserPic()
    }, [])
    
    const grabUserPic = async () => {
        const token = localStorage.getItem("token")
        const currentUserId = await getPayloadFromToken(token).user_id;
        const data = await getUserById(currentUserId, token)
        setUser({...data.user})
    }


    return (
        <nav>
            <div className="left-nav">
                {/* <Link to='/feed'><button className="nav-link">Logo</button></Link> */}
                <Link to='/feed'>
                <div>
                    <img 
                    src="public/ThySpace_Logo.png" 
                    width='180'
                    height='120'
                    alt="Thy Space Logo"
                    />
                    </div>
                    </Link>
            </div>
            <div className="right-nav">
                <Link to='/findalliances'><button className="nav-link">Find Alliances</button></Link>
                <Link to='/diplomacy'><button className="nav-link">Diplomacy</button></Link>
                <Link><div className='nav-pic'>{user.profilePicture ? <img src={user.profilePicture} width='26rem' height='26rem'
                />: 'Picture'}</div></Link>
                <Link to='/myprofile'><button className="nav-link">My Account</button></Link>
                <LogoutButton />
            </div>
        </nav>
    )
}

export default NavBar