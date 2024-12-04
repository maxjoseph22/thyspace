import { convertDate } from "../services/helperFunctions"
import { Link } from "react-router-dom";
import AllianceRequestButton from "./AllianceRequestButton"

const PotentialAlliance = ({ user }) => {
    console.log(user)
    return (
        <div className="">
            <h2>{user.profilePicture ? user.profilePicture: 'Tom'}</h2>
            <p>{`${user.firstname} ${user.lastname}`}</p>
            <p>{user.location}</p>
            {/* <p>Joined: {convertDate(user)}</p> */}
            <AllianceRequestButton _id={user._id} status={user.status}/>
        </div>
    )
}

export default PotentialAlliance