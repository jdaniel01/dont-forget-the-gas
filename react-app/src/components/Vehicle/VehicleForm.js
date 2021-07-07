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
                total_miles: miles,
                fuel_type: fuelType,
                fuel_tank: fuelTank,
                avg_mpg: mpg
            }))
        }
        else {
            setErrors(newErrors)
        }
    }

    const updateMake = (e) => {
        setMake(e.target.value)
    }
    const updateModel = (e) => {
        setModel(e.target.value)
    }
    const updateColor = (e) => {
        setColor(e.target.value)
    }
    const updateStorage = (e) => {
        setStorage(e.target.value)
    }
    const updateBody = (e) => {
        setBody(e.target.value)
    }
    const updateCapacity = (e) => {
        setCapacity(e.target.value)
    }
    const updateMiles = (e) => {
        setMiles(e.target.value)
    }
    const updateTank = (e) => {
        setTank(e.target.value)
    }
    const updateType = (e) => {
        setType(e.target.value)
    }
    const updateMpg = (e) => {
        setMpg(e.target.value)
    }

    return (
        <div className="vehicle-form-container">
            <div className="vehicle-form_header-container">
                <h2>Add A Vehicle</h2>
            </div>
            <div className="form-container">
                <form onSubmit={() => onVehicleSubmit} className="vehicle-form">
                    <div className="vehicle-form_section">
                        <label htmlFor="make">Vehicle Make: </label>
                        <input type="text" id="make" name="make" value={make} onChange={updateMake} />
                    </div>
                    <div className="vehicle-form_section">
                        <label htmlFor="model">Vehicle Model: </label>
                        <input type="text" id="model" name="model" value={model} onChange={updateModel} maxLength={500} />
                    </div>
                    <div className="vehicle-form_section">
                        <label htmlFor="body">Body Style: </label>
                        <input type="text" id="body" name="body" value={body} onChange={updateBody} />
                    </div>
                    <div className="vehicle-form_section">
                        <label htmlFor="storage">Storage Capacity: </label>
                        <input type="number" step={.1} id="storage" name="storage" value={storage} onChange={updateStorage} />
                    </div>
                    <div className="vehicle-form_section">
                        <label htmlFor="color">Vehicle Color: </label>
                        <input type="text" id="color" name="color" value={color} onChange={updateColor} />
                    </div>
                    <div className="vehicle-form_section">
                        <label htmlFor="total_miles">Odemeter: </label>
                        <input type="number" step={.1} id="total_miles" name="total_miles" value={miles} onChange={updateMiles} />
                    </div>
                    <div className="vehicle-form_section">
                        <label htmlFor="fuel_type">Fuel Type: </label>
                        <input type="text" step={.1} id="fuel_type" name="fuel_type" value={fuelType} onChange={updateType} />
                    </div>
                    <div className="vehicle-form_section">
                        <label htmlFor="fuel_tank">Fuel Capacity(gal): </label>
                        <input type="number" step={.1} id="fuel_tank" name="fuel_tank" value={fuelTank} onChange={updateTank} />
                    </div>
                    <div className="vehicle-form_section">
                        <label htmlFor="avg_mpg">Average Miles Per Gallon(mpg): </label>
                        <input type="number" step={.1} id="avg_mpg" name="avg_mpg" value={mpg} onChange={updateMpg} />
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
