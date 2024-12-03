import AllianceRequest from "./AllianceRequestsView"

const AllianceRequestContainer = ({ users }) => {
    return (
        <>
            {
                users.map(user => {
                    return <AllianceRequest user={user} key={user._id} />
                })
            }
        </>
    )
}

export default AllianceRequestContainer