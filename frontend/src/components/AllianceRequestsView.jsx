import ForgeAllianceButton from "./ForgeAllianceButton"
import RejectAllianceButton from "./RejectAllianceButton"

const AllianceRequest = (props) => {
    return (
        <div className="alliance-request">
            <h2>Profile Tapestry</h2>
            <h3>{props.user.firstname} {props.user.lastname}</h3>
            <p>{props.user.location}</p>
            <ForgeAllianceButton _id={props.user._id} setUsers={props.setUsers}/>
            <RejectAllianceButton _id={props.user._id} setUsers={props.setUsers}/>
        </div>
    )
}
export default AllianceRequest

