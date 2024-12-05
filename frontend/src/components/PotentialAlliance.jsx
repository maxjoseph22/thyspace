import { convertDate } from "../services/helperFunctions"
import { Link } from "react-router-dom";
import React, { useState } from "react";
import AllianceRequestButton from "./AllianceRequestButton"

const PotentialAlliance = ({ user }) => {
    // const [role, setRole] = useState(user.allianceRole)

    // const updateRole = newRole => {
    //     setRole(newRole)
    // }

    return (
        <div className="">
            {user.profilePicture && <img src={user.profilePicture}/>}
            <p>{`${user.firstname} ${user.lastname}`}</p>
            <p>{user.location}</p>
            {/* <p>Joined: {convertDate(user)}</p> */}
            <AllianceRequestButton _id={user._id} status={user.status} role={user.allianceRole}/>
        </div>
    )
}

export default PotentialAlliance