import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addList } from "../../store/list";

const ListForm = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const types = useSelector(state => state.list_types);
    const lists = useSelector(state => state.list.collections)

    const [name, setName] = useState("");
    const [typeId, setTypeId] = useState();
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState([]);
    const [wasAlerted, setAlerted] = useState(false)
    const [ownerId, setOwnerId] = useState(user.id)

    const updateName = (someText) => {
        setName(someText)
    }

    const updateType = (someType) => {
        setTypeId(someType)
    }

    const updateNotes = (someNotes) => {
        setNotes(someNotes)
    }

    const updateOwner = (someOwner) => {
        setOwnerId(user.id)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let newErrors = []

        if (!name) {
            newErrors.push("Your list should have a name.")
        }
        else if (name.length < 3) {
            newErrors.push("Your list name should consist of more than 2 character spaces.")
        }
        else if (name.length > 50) {
            newErrors.push("Your list name should be at most 50 character spaces.")
        }
        else if (typeof name != "string") {
            newErrors.push("Nice try, but your list name should be in string format.")
        }
        if (!typeId) {
            newErrors.push("Please choose a category for your list")
        }
        if (!wasAlerted) {
            window.alert("I just wanted you to know that you didn't provide a description for your new list. You really should.")
            setAlerted(true)
        }
        setErrors(newErrors)
        if (!errors.length) {
            dispatch(addList({ "name": name, "type_id": typeId, "owner_id": ownerId, "notes": notes }))
        }
    }



    return (
        <div className="list-form-container">
            <div className="list-form_header-container">
                <h2>The List Form</h2>
            </div>
            <div className="list-form_errors-container">
                {errors.length && errors.map(error => <li className="list-form_error">{error}</li>)}
            </div>
            <div className="list-form_form-container">
                <form onSubmit={onSubmit} className="list-form">
                    <div className="list-form_field-container">
                        <label htmlFor="name">List Name: </label>
                        <input name="name" id="name" placeholder="Your List Name Here..." onChange={(e) => updateName(e.target.value)} value={name} />
                    </div>
                    <div className="list-form_field-container">
                        <label htmlFor="type_id">List Type: </label>
                        <select id="type_id" name="type_id" value={typeId} onChange={(e) => updateType(e.target.value)}>
                            {types && types.map(listType =>
                                <option value={listType.id}>{listType.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="list-form_field-container">
                        <label htmlFor="notes">List Notes: </label>
                        <textarea type="text" id="notes" name="notes" value={notes} onChange={(e) => updateNotes(e.target.value)} />
                    </div>
                    <div className="list-form_submit-button-container">
                        <button type="submit">Confirm New List</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ListForm;