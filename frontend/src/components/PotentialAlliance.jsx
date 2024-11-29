import { convertDate } from "../services/helperFunctions"

const PotentialAlliance = ({ user }) => {
    return (
        <div className="">
            <p>{user.profilePicture ? user.profilePicture: 'Tom'}</p>
            <p>Username: {user.username}</p>
            <p>Name: {`${user.firstname} ${user.lastname}`}</p>
            <p>Joined: {convertDate(user)}</p>
        </div>
    )
}

export default PotentialAlliance