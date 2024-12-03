import { convertDate } from "../services/helperFunctions"
import AllianceRequestButton from "./AllianceRequestButton"

const PotentialAlliance = ({ user }) => {
    return (
        <div className="">
            <h2>{user.profilePicture ? user.profilePicture: 'Tom'}</h2>
            <p>Username: {user.username}</p>
            <p>Name: {`${user.firstname} ${user.lastname}`}</p>
            <p>Joined: {convertDate(user)}</p>
            <AllianceRequestButton _id={user._id}/>
        </div>
    )
}

export default PotentialAlliance