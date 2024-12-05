import AllianceRequest from "./AllianceRequestsView"

const AllianceRequestContainer = ({ users, setUsers }) => {
    return (
        <>
            {
                users.map(user => {
                    return <AllianceRequest user={user} key={user._id} setUsers={setUsers} />
                })
            }
        </>
    )
}

export default AllianceRequestContainer