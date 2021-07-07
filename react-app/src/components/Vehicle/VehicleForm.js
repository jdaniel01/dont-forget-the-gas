import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addVehicle, dropVehicle, editVehicle, getUser } from "../../store/user";



function VehicleForm() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)

    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [body, setBody] = useState("")
    const [storage, setStorage] = useState(0)
    const [color, setColor] = useState("")
    const [capacity, setCapacity] = useState(1)
    const [miles, setMiles] = useState(0)
    const [fuelType, setType] = useState("GAS")
    const [fuelTank, setTank] = useState("")
    const [mpg, setMpg] = useState(0)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!user) {
            dispatch(getUser())
        }
    }, [user])

    const onVehicleSubmit = (e) => {
        e.preventDefault()
        let newErrors = []

        if (!make) {
            newErrors.push("Please enter your vehicle's make.")
        }
        if (!model) {
            newErrors.push("Please enter your vehicle's model.")
        }
        if (!body) {
            newErrors.push("Please enter your vehicle's body style.")
        }
        if (!storage) {
            newErrors.push("Please enter your vehicle's storage capacity.")
        }
        if (!color) {
            newErrors.push("Please enter your vehicle's color.")
        }
        if (!fuelType) {
            newErrors.push("Please enter your vehicle's storage.")
        }
        if (!miles) {
            newErrors.push("Please enter your vehicle's odometer reading.")
        }
        if (!fuelTank) {
            newErrors.push("Please enter your vehicle's fuel tank capacity.")
        }
        if (!capacity) {
            newErrors.push("Please enter the storage capacity of your vehicle.")
        }
        // if (!mpg) {
        //     newErrors.push("Please enter your vehicle's average MPG, if you don't know just guess.")
        // }
        if (!newErrors.length) {
            dispatch(addVehicle({
                make: make,
                model: model,
                body: body,
                storage: storage,
                owner_id: user.id,
                color: color,
                capacity: capacity,
                total_miles: total_miles,
                fuel_type: fuel_type,
                fuel_tank: fuel_tank,
                avg_mpg: avg_mpg
            }))
        }
    }

    return (
        <div className="vehicle-form-container">
            <div className="vehicle-form_header-container">
                <h2>Add A Vehicle</h2>
            </div>
            <div className="form-container">
                <form onSubmit={() => onVehicleSubmit} className="vehicle-form">
                    <div className="vehicle-form_section">
                        <label htmlFor="title">Vehicle Name: </label>
                        <input type="text" id="title" name="title" value={title} onChange={(e) => updateTitle(e.target.value)} />
                    </div>
                    <div className="vehicle-form_section">
                        <label htmlFor="notes">Vehicle Notes: </label>
                        <textarea type="text" id="notes" name="notes" value={notes} onChange={(e) => updateNotes(e.target.value)} maxLength={500} />
                    </div>
                    <div className="vehicle-form_submit-button-container">
                        <button type="submit">Add It To The Garage!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default VehicleForm;
