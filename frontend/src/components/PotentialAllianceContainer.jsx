import PotentialAlliance from "./PotentialAlliance"

const PotentialAllianceContainer = ({ users }) => {
    return (
        <>
            {
                users.map(user => {
                    return <PotentialAlliance user={user} key={user._id} />
                })
            }
        </>
    )
}

export default PotentialAllianceContainer