import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, dropItem, editItem } from "../../store/item";
import { getUser } from "../../store/user";



const ItemForm = ({ item }) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)
    if (!user) {
        dispatch(getUser())
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }
    const updateNotes = (e) => {
        setNotes(e.target.value)
    }

    // New Item
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    return (
        <div className="item-form-container">
            <div className="item-form_header-container">
                <h2>Add To The List.</h2>
            </div>
            <div className="form-container">
                <form onSubmit={() => onItemSubmit} className="item-form">
                    <div className="item-form_section">
                        <label htmlFor="title">Item Name: </label>
                        <input type="text" id="title" name="title" value={title} onChange={(e) => updateTitle(e.target.value)} />
                    </div>
                    <div className="item-form_section">
                        <label htmlFor="notes">Item Notes: </label>
                        <textarea type="text" id="notes" name="notes" value={notes} onChange={(e) => updateNotes(e.target.value)} maxLength={500} />
                    </div>
                    <div className="item-form_submit-button-container">
                        <button type="submit">Add It To The List!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
//    item edit
const [title, setTitle] = useState(item.title)
const [notes, setNotes] = useState(item.notes)
return (
    <div className="item-form-container">
        <div className="item-form_header-container">
            <h2>Add To The List.</h2>
        </div>
        <div className="form-container">
            <form onSubmit={() => onItemSubmit} className="item-form">
                <div className="item-form_section">
                    <label htmlFor="title">Item Name: </label>
                    <input type="text" id="title" name="title" value={title} onChange={(e) => updateTitle(e.target.value)} />
                </div>
                <div className="item-form_section">
                    <label htmlFor="notes">Item Notes: </label>
                    <textarea type="text" id="notes" name="notes" value={notes} onChange={(e) => updateNotes(e.target.value)} maxLength={500} />
                </div>
                <div className="item-form_submit-button-container">
                    <button type="submit">Add It To The List!</button>
                </div>
            </form>
        </div>
    </div>
)
    }
}

export default ItemForm;