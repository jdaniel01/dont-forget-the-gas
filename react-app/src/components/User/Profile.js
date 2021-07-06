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
        }
    }, [dispatch])

    return (
        <div>
            printing objects.
        </div>
    )
}

export default Profile;