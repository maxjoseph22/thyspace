import ForgeAllianceButton from "./ForgeAllianceButton"
import RejectAllianceButton from "./RejectAllianceButton"
import "./AllianceRequestsView.css";

const AllianceRequest = (props) => {
    return (
        <div className="alliance-request">
            {/* <strong><h3>Profile Tapestry</h3></strong> */}
            <h3>{props.user.firstname} {props.user.lastname}</h3>
            <p>{props.user.location}</p>
            <ForgeAllianceButton _id={props.user._id}/>
            <RejectAllianceButton _id={props.user._id}/>
        </div>
    )
}
export default AllianceRequest

