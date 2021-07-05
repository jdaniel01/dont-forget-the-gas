import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import List from "../List"

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [vehicle, setVehicle] = useState(user.vehicles[0])

    return (
        <div>
            This is the user profile
        </div>
    )
}

export default Profile;