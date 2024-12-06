import ForgeAllianceButton from "./ForgeAllianceButton"
import RejectAllianceButton from "./RejectAllianceButton"
import "./AllianceRequestsView.css";
import Shield from "../assets/Shield.png"

const AllianceRequest = (props) => {
    return (
        <div className="alliance-request">
            {/* <strong><h3>Profile Tapestry</h3></strong> */}
            <div className="image-container">
                <img
                    src={Shield}
                    alt="Shield"
                    className="shield-overlay"
                />
                <img className="avatar-image"
                    src={props.user.profilePicture || "http://via.placeholder.com/150"}
                    alt={`${props.user.firstname || 'User'}'s Profile Pic`}
                />
            </div>
            <h3>{props.user.firstname} {props.user.lastname}</h3>
            <p>{props.user.location}</p>
            <ForgeAllianceButton _id={props.user._id} setUsers={props.setUsers}/>
            <RejectAllianceButton _id={props.user._id} setUsers={props.setUsers}/>
        </div>
    )
}
export default AllianceRequest

