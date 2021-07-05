import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addList } from "../../store/list";

const ListForm = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const types = useSelector(state => state.list_types);
    const lists = useSelector(state => state.lists.collections)

    const [name, setName] = useState("");
    const [typeId, setTypeId] = useState(types[0]);
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState([]);
    const [wasAlerted, setAlerted] = useState(false)
    const [ownerId, setOwnerId] = useState(user.id)
    const newList = lists[0]

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


    useEffect(() => {
        // if 
        // Redirect(`/api/lists/`)
    }, [dispatch, newList])

    return (
        <div className="list-form-container">
            <div className="list-form_header-container">
                <h2>The List Form</h2>
            </div>
            <div className="list-form_form-container">
                <form onSubmit={onSubmit} className="list-form">
                    <div className="list-form_field-container">
                        <label htmlFor="name">List Name: </label>
                        <input name="name" id="name" placeholder="Your List Name Here..." onChange={(e) => updateName(e.target.value)} value={name} />
                    </div>
                </form>
            </div>
        </div>
    )
}