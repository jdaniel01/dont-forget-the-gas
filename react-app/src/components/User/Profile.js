import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/user"
import List from "../List"

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [vehicle, setVehicle] = useState(user.vehicles)

    useEffect(() => {
        if (!user.id) {
            dispatch(getUser())
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^USER^^^^^^^^", user)
        }
    }, [dispatch])

    return (
        <div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.on_trip}</div>
            <div>{user.about}</div>
        </div>
    )
}

export default Profile;