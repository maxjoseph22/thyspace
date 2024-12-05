import { convertDate } from "../services/helperFunctions"
import { Link } from "react-router-dom";
import React, { useState } from "react";
import AllianceRequestButton from "./AllianceRequestButton"

const PotentialAlliance = ({ user }) => {
    const [role, setRole] = useState(user.allianceRole)

    const updateRole = newRole => {
        setRole(newRole)
    }

    return (
        <div className="">
            <h2>{user.profilePicture ? user.profilePicture: 'Tom'}</h2>
            <p>{`${user.firstname} ${user.lastname}`}</p>
            <p>{user.location}</p>
            {/* <p>Joined: {convertDate(user)}</p> */}
            {console.log(user)}
            <AllianceRequestButton _id={user._id} status={user.status} role={user.allianceRole}/>
        </div>
    )
}

export default PotentialAlliance