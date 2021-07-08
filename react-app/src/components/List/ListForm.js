import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addList, getLists } from "../../store/list";
import { getUser } from "../../store/user";
import { getTypes } from "../../store/type";

const ListForm = ({ setAdding }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const types = useSelector(state => state.type.types);
    const [name, setName] = useState("");
    const [typeId, setTypeId] = useState();
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!user) {
            dispatch(getUser())
            console.log("$$$$$$$$$$$$$$$$USER$$$$$$$$$$$$$", user)
        }
        if (!typeId || !types) {
            dispatch(getTypes())
        }
    }, [dispatch, typeId, user])

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updateType = (e) => {
        setTypeId(e.target.value)
    }

    const updateNotes = (e) => {
        setNotes(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!errors.length) {
            dispatch(addList({ "name": name, "type_id": typeId, "owner_id": user.id, "notes": notes }))
            setAdding(false)

        }
    }

    useEffect(() => {
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
        setErrors(newErrors)
    }, [name, typeId])




    return (
        <div className="list-form-container">
            <div className="list-form_header-container">
                <h2>The List Form</h2>
            </div>
            <div className="list-form_errors-container">
                {errors.length > 0 && errors.map(error => <li key={error} className="list-form_error">{error}</li>)}
            </div>
            <div className="list-form_form-container">
                <form onSubmit={onSubmit} className="list-form">
                    <div className="list-form_field-container">
                        <label htmlFor="name">List Name: </label>
                        <input name="name" id="name" placeholder="Your List Name Here..." onChange={updateName} value={name} />
                    </div>
                    <div className="list-form_field-container">
                        <label htmlFor="type_id">List Type: </label>
                        <select id="type_id" name="type_id" value={typeId} onChange={updateType}>
                            {types.map(type =>
                                <option key={type.id} value={type.id}>{type.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="list-form_field-container">
                        <label htmlFor="notes">List Notes: </label>
                        <textarea type="text" id="notes" name="notes" value={notes} onChange={updateNotes} />
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