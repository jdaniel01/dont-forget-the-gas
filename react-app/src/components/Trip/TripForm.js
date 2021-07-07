import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTrip } from "../../store/trip";

const TripForm = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);

    const [departure, setDeparture] = useState()


    const [name, setName] = useState("");
    const [typeId, setTypeId] = useState();
    const [description, setdescription] = useState("");
    const [errors, setErrors] = useState([]);
    const [wasAlerted, setAlerted] = useState(false)
    const [leadId, setleadId] = useState(user.id)

    const updateName = (someText) => {
        setName(someText)
    }

    const updateType = (someType) => {
        setTypeId(someType)
    }

    const updatedescription = (somedescription) => {
        setdescription(somedescription)
    }

    const updateOwner = (someOwner) => {
        setleadId(user.id)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let newErrors = []

        if (!name) {
            newErrors.push("Your trip should have a name.")
        }
        else if (name.length < 3) {
            newErrors.push("Your trip name should consist of more than 2 character spaces.")
        }
        else if (name.length > 50) {
            newErrors.push("Your trip name should be at most 50 character spaces.")
        }
        else if (typeof name != "string") {
            newErrors.push("Nice try, but your trip name should be in string format.")
        }
        if (!departure) {
            newErrors.push("Please choose a departure date for your trip")
        }
        if (!arrival) {
            newErrors.push("Please choose an estimated arrival date for your trip")
        }
        if (!days) {
            newErrors.push("It looks like there was a problem calculating the length of your trip. Try again.")
        }
        if (!description) {
            if (!wasAlerted) {
                window.alert("I just wanted you to know that you didn't provide a description for your new trip. You really should.")
                setAlerted(true)
            }
        }
        if (!distance) {
            newErrors.push("Looks like there was a problem calculating the total distance of your trip. Try again.")
        }
        if (!leadId) {
            newErrors.push("Uh oh. We didn't get the information for the roadtrip packleader. Try again.")
        }
        setErrors(newErrors)
        if (!errors.length) {
            dispatch(addtrip({ "name": name, "departure": departure, "arrival": arrival, "days": days, "distance": distance, "lead_id": leadId, "description": description }))
        }

    }



    return (
        <div className="trip-form-container">
            <div className="trip-form_header-container">
                <h2>The Trip Form</h2>
            </div>
            <div className="trip-form_errors-container">
                {errors.length && errors.map(error => <li className="trip-form_error">{error}</li>)}
            </div>
            <div className="trip-form_form-container">
                <form onSubmit={onSubmit} className="trip-form">
                    <div className="trip-form_field-container">
                        <label htmlFor="name">Trip Name: </label>
                        <input name="name" id="name" placeholder="Your trip Name Here..." onChange={(e) => updateName(e.target.value)} value={name} />
                    </div>
                    <div className="trip-form_field-container">
                        <label htmlFor="departure">Trip Type: </label>
                        <select id="departure" name="departure" value={typeId} onChange={(e) => updateType(e.target.value)}>
                            {types && types.map(tripType =>
                                <option value={tripType.id}>{tripType.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="trip-form_field-container">
                        <label htmlFor="description">Trip description: </label>
                        <textarea type="text" id="description" name="description" value={description} onChange={(e) => updatedescription(e.target.value)} />
                    </div>
                    <div className="trip-form_submit-button-container">
                        <button type="submit">Confirm New Trip</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default tripForm;