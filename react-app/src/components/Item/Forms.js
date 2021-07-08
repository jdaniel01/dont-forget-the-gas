import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, dropItem, editItem } from "../../store/item";
import { getUser } from "../../store/user";
import { useLayoutEffect } from "react";



export const NewItem = ({ item, list_id, updateItems }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user.user)

    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")


    useEffect(() => {
        if (!user) {
            dispatch(getUser())
        }
    }, [dispatch, item])

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }
    const updateNotes = (e) => {
        setNotes(e.target.value)
    }

    const onItemSubmit = (e) => {
        e.preventDefault()
        let newErrors = []
        if (!title) {
            newErrors.push("Please provide a title for your new list item.")
        }
        if (!newErrors.length) {
            const newItem = {
                title,
                notes,
                list_id
            }
            dispatch(addItem(newItem))
            updateItems(false)
        }
    }

    return (
        <div className="item-form-container">
            <div className="item-form_header-container">
                <h2>Adding To The List.</h2>
            </div>
            <div onClick={() => updateItems(false)}>
                Cancel
            </div>
            <div className="form-container">
                <form onSubmit={() => onItemSubmit} className="item-form">
                    <div className="item-form_section">
                        <label htmlFor="title">Item Name: </label>
                        <input type="text" id="title" name="title" value={title} onChange={updateTitle} />
                    </div>
                    <div className="item-form_section">
                        <label htmlFor="notes">Item Notes: </label>
                        <textarea type="text" id="notes" name="notes" value={notes} onChange={updateNotes} maxLength={500} />
                    </div>
                    <div className="item-form_submit-button-container">
                        <button type="submit">Add It To The List!</button>
                    </div>
                </form>
            </div>
        </div >
    )
}


export const EditItem = ({ item, list_id }) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)

    const { itemId } = useParams()

    const [title, setTitle] = useState(item.title)
    const [notes, setNotes] = useState(item.notes)

    useEffect(() => {
        if (!user) {
            dispatch(getUser())
        }
    }, [dispatch, item])

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }
    const updateNotes = (e) => {
        setNotes(e.target.value)
    }

    const onItemSubmit = (e) => {
        e.preventDefault()
        let newErrors = []
        if (!title) {
            newErrors.push("Please provide a title for your new list item.")
        }
        if (!newErrors.length) {
            const newItem = {
                title,
                notes,
                list_id
            }
            dispatch(addItem(newItem))
        }
    }

    const deleteItem = () => {

    }

    return (
        <div className="item-form-container">
            <div className="item-form_header-container">
                <h2>Editting An Item.</h2>
            </div>
            <div className="form-container">
                <form onSubmit={() => onItemSubmit} className="item-form">
                    <div className="item-form_section">
                        <label htmlFor="title">Item Name: </label>
                        <input type="text" id="title" name="title" value={title} onChange={updateTitle} />
                    </div>
                    <div className="item-form_section">
                        <label htmlFor="notes">Item Notes: </label>
                        <textarea type="text" id="notes" name="notes" value={notes} onChange={updateNotes} maxLength={500} />
                    </div>
                    <div className="item-form_submit-button-container">
                        <button type="submit">Add It To The List!</button>
                    </div>
                    <div className="item-form_delete-button-container">
                        <button type="button" onClick={deleteItem}>Delete This Item</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
