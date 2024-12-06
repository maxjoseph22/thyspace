import AllianceRequestButton from "./AllianceRequestButton"
import './PotAlliance.css'
import Shield from "../assets/Shield.png"
import { Link } from 'react-router-dom';  // Import Link from react-router-dom


const PotentialAlliance = ({ user }) => {
    // const [role, setRole] = useState(user.allianceRole)

    // const updateRole = newRole => {
    //     setRole(newRole)
    // }

    return (
        <div className="alliance">
            <div className="image-container">
                <img
                    src={Shield}
                    alt="Shield"
                    className="shield-overlay"
                />
                <img className="avatar-image"
                    src={user.profilePicture || "http://via.placeholder.com/150"}
                    alt={`${user.firstname || 'User'}'s Profile Pic`}
                />
            </div>
            <Link to={`/userprofile/${user._id}`} className="user-profile-link">
                <h3>{user.firstname} {user.lastname}</h3>
            </Link>
            {/* <p className="alliance-info">{`${user.firstname} ${user.lastname}`}</p> */}
            <p className="alliance-info">{user.location}</p>
            {/* <p>Joined: {convertDate(user)}</p> */}
            <AllianceRequestButton _id={user._id} status={user.status} role={user.allianceRole}/>
        </div>
    )
}

export default PotentialAlliance