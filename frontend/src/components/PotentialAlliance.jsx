import AllianceRequestButton from "./AllianceRequestButton"

const PotentialAlliance = ({ user }) => {
    console.log(user)
    return (
        <div className="">
            {user.profilePicture && <img src={user.profilePicture}/>}
            <p>{`${user.firstname} ${user.lastname}`}</p>
            <p>{user.location}</p>
            <AllianceRequestButton _id={user._id} status={user.status}/>
        </div>
    )
}

export default PotentialAlliance