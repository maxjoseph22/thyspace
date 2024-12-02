const AllianceRequest = (props) => {
    console.log(props)
    return (
        <div className="alliance-request">
            <h2>Profile Tapestry</h2>
            <h3>{props.user.firstname} {props.user.lastname}</h3>
            <p>{props.user.location}</p>
            <button className="accept-request">Complete the forging of this alliance?</button>
        </div>
    )
}
export default AllianceRequest

