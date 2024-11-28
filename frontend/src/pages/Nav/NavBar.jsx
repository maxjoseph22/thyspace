import { Link } from "react-router-dom"
import LogoutButton from "../../components/LogoutButton"
import './NavBar.css'

const NavBar = () => {
    return (
        <nav>
            <div className="left-nav">
                <Link to='/feed'><button className="nav-link">Logo</button></Link>
            </div>
            <div className="right-nav">
                <Link><button className="nav-link">Friends</button></Link>
                <Link ><button className="nav-link">Pic</button></Link>
                <Link to='/myprofile'><button className="nav-link">My Account</button></Link>
                <LogoutButton />
            </div>
        </nav>
    )
}

export default NavBar