import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/user"
import { getVehicles } from '../../store/vehicle'
import VehicleForm from "../Vehicle/VehicleForm";
import './User.css';

function Profile() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user)
    const vehicles = useSelector(state => state.vehicle.vehicles)

    const [viewingGarage, setViewingGarage] = useState(false)

    useEffect(() => {
        if (!user.id) {
            dispatch(getUser())
        }
        if (!vehicles.length) {
            dispatch(getVehicles(user.id))
        }
    }, [dispatch])

    const enterGarage = () => {
        setViewingGarage(!viewingGarage)
    }

    return (
        <div className="profile-container">
            <div className="user_info">
                <h2>{user.username}</h2>
                <div>{user.email}</div>
                <div>{user.on_trip}</div>
                <div>{user.about}</div>
            </div>
            <div className="garage-container">
                <h2>Garage</h2>
                {!viewingGarage &&
                    <div className="form-button add-car-button" onClick={enterGarage}>
                        Add A Car
                    </div>
                }
                {viewingGarage &&
                    <div className="form-button add-car-button" onClick={enterGarage}>
                        Cancel
                </div>
                }

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
    )
}

export default Profile;