import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, dropItem, editItem } from "../../store/item";
import { getUser } from "../../store/user";
import { getList } from "../../store/list";
import { useLayoutEffect } from "react";



export const NewItem = ({ setAdding, }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const { listId } = useParams()
    // const aList = useSelector(state => state.list.list)

    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")
    const [errors, setErrors] = useState([])


    useEffect(() => {
        let newErrors = []
        if (!name) {
            newErrors.push("Please provide a name for your new list item.")
        }
        setErrors(newErrors)
    }, [name])

    const updatename = (e) => {
        setName(e.target.value)
        // console.log(name)
    }
    const updateNotes = (e) => {
        setNotes(e.target.value)
        // console.log(notes)
        console.log(listId)
    }

    const onItemSubmit = (e) => {
        e.preventDefault()
        if (!errors.length) {
            const newItem = {
                itemName: name,
                itemNotes: notes,
                list_id: listId
            }
            dispatch(addItem(newItem))
            setAdding(false)
            history.push(`/lists/${listId}`)
        }
    }

    return (
        <div className="item-form-container">
            <div className="item-form_header-container">
                <h2>Adding To The List.</h2>
            </div>
            <div onClick={() => setAdding(false)}>
                Cancel
            </div>
            <div className="form-container">
                {errors && errors.map(error => <div key={error}>{error}</div>)}
                <form onSubmit={onItemSubmit} className="item-form">
                    <div className="item-form_section">
                        <label htmlFor="itemName">Item Name: </label>
                        <input type="text" id="itemName" name="itemName" value={name} onChange={updatename} />
                    </div>
                    <div className="item-form_section">
                        <label htmlFor="itemNotes">Item Notes: </label>
                        <textarea type="text" id="itemNotes" name="itemNotes" value={notes} onChange={updateNotes} maxLength={500} />
                    </div>
                    <div className="item-form_submit-button-container">
                        <button type="submit">Add It To The List!</button>
                    </div>
                </form>
            </div>
        </div >
    )
}


export const EditItem = ({ item, list_id, setAdding }) => {

    const dispatch = useDispatch()
    const { listId } = useParams()

    const user = useSelector(state => state.user.user)
    const itemb = useSelector(state => state.item.item)

    const [name, setName] = useState(itemb.name)
    const [notes, setNotes] = useState(item.notes)
    const [errors, setErrors] = useState([])

    // useEffect(() => {
    //     if (!user) {
    //         dispatch(getUser())
    //     }
    // }, [dispatch, item])

    const updatename = (e) => {
        setName(e.target.value)
    }
    const updateNotes = (e) => {
        setNotes(e.target.value)
    }

    useEffect(() => {
        let newErrors = []
        if (!name) {
            newErrors.push("Please provide a name for your new list item.")
        }
        setErrors(newErrors)
    }, [name])

    const onItemSubmit = (e) => {
        e.preventDefault()
        if (!errors.length) {
            let newItem = {
                itemName: name,
                itemNotes: notes,
                list_id: listId
            }
            setAdding(false)
            dispatch(addItem(newItem))
            // }
        }
    }

    const deleteItem = (e) => {
        dispatch(dropItem(e.target.id))
    }

    return (
        <div className="item-form-container">
            <div className="item-form_header-container">
                <h2>Editting An Item.</h2>
            </div>
            <div className="form-container">
                <form onSubmit={onItemSubmit} className="item-form">
                    <div className="item-form_section">
                        <label htmlFor="itemName">Item Name: </label>
                        <input type="text" id="itemName" name="itemName" value={name} onChange={updatename} />
                    </div>
                    <div className="item-form_section">
                        <label htmlFor="itemNotes">Item Notes: </label>
                        <textarea type="text" id="itemNotes" name="itemNotes" value={notes} onChange={updateNotes} maxLength={500} />
                    </div>
                    <div className="item-form_submit-button-container">
                        <button type="submit">Add It To The List!</button>
                    </div>
                    <div className="item-form_delete-button-container">
                        <button type="button" id={itemb.id} onClick={deleteItem}>Delete This Item</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
