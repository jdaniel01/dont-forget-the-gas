import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/user"
import List from "../List"
import VehicleForm from "../Vehicle/VehicleForm";

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    const [vehicles, setVehicles] = useState(user.vehicles)

    const [viewingGarage, setViewingGarage] = useState(false)

    useEffect(() => {
        if (!user.id) {
            dispatch(getUser())
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^USER^^^^^^^^", user)
        }
    }, [dispatch])

    const enterGarage = () => {
        setViewingGarage(!viewingGarage)
    }

    return (
        <div>
            <div>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>{user.on_trip}</div>
                <div>{user.about}</div>
            </div>
            <div>
                <div>
                    <h2>Vehicles</h2>
                    <div onClick={enterGarage}>
                        Add A Car
                    </div>
                </div>
                <div>
                    {user.vehicles && !viewingGarage &&
                        user.vehicles.map(vehicle =>
                            <div key={vehicle.id} hidden={true}>
                                <div> Make: {vehicle.make}</div>
                                <div> Model: {vehicle.model}</div>
                                <div> Body Style: {vehicle.body}</div>
                                <div> Storage Capacity(cuft): {vehicle.storage}</div>
                                <div> Color: {vehicle.color}</div>
                                <div> Passenger Capacity: {vehicle.capacity}</div>
                                <div> Total Milage (odometer): {vehicle.total_miles}</div>
                                <div> Fuel Type: {vehicle.fuel_type}</div>
                                <div> Fuel Tank(gal): {vehicle.fuel_tank}</div>
                                <div> Average Miles Per Gallon(mpg): {vehicle.avg_mpg}</div>
                            </div>
                        )}
                    {
                        viewingGarage &&
                        <div>
                            <VehicleForm />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;