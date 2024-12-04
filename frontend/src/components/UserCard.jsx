const UserCard = ({ user }) => {
    return (
        <div>
            <h3>{user.profilePicture && <img src={user.profilePicture} />}</h3>
            <h3>{user && user.username}</h3>
            <h3>{user && user.firstname}</h3>
            <h3>{user && user.lastname}</h3>
            <h3>{user && user.alliances}</h3>
            <h3>{user && user.location}</h3>
        </div>
    )
}

export default UserCard;