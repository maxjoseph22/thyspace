import AllianceRequestButton from "./AllianceRequestButton"
import './PotAlliance.css'

const PotentialAlliance = ({ user }) => {
    // const [role, setRole] = useState(user.allianceRole)

    // const updateRole = newRole => {
    //     setRole(newRole)
    // }

    return (
        <div className="alliance">
            {user.profilePicture && <img src={user.profilePicture}/>}
            <p className="alliance-info">{`${user.firstname} ${user.lastname}`}</p>
            <p className="alliance-info">{user.location}</p>
            {/* <p>Joined: {convertDate(user)}</p> */}
            <AllianceRequestButton _id={user._id} status={user.status} role={user.allianceRole}/>
        </div>
    )
}

export default PotentialAlliance