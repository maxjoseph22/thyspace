const UserCard = ({ user }) => {
    return (
        <div>
            <h3>{user.profilePicture}</h3>
            <h3>{user.username}</h3>
            <h3>{user.firstname}</h3>
            <h3>{user.lastname}</h3>
            <h3>{user.alliances}</h3>
            <h3>{user.location}</h3>
        </div>
    )
}

export default UserCard;