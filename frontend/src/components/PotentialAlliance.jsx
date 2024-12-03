import { convertDate } from "../services/helperFunctions"
import { Link } from "react-router-dom";
import AllianceRequestButton from "./AllianceRequestButton"

const PotentialAlliance = ({ user }) => {
    return (
        <div className="">
            <p>{user.profilePicture ? user.profilePicture: 'Tom'}</p>
            <Link to={`/userprofile/${user._id}`}>
            <p>Username: {user.username}</p>
            </Link>
            <p>Name: {`${user.firstname} ${user.lastname}`}</p>
            <p>Joined: {convertDate(user)}</p>
            <AllianceRequestButton _id={user._id}/>
        </div>
    )
}

export default PotentialAlliance