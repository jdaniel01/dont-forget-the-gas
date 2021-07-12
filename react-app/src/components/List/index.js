import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList, addItem, dropItem } from "../../store/list";
import { getItems } from "../../store/item";
import { NewItem, EditItem } from "../Item/Forms"
import Item from "../Item"
import "./List.css"

const ItemDetails = ({ item, setAdding, setEditing, adding, list_id }) => {

    const dispatch = useDispatch()

    const currList = useSelector(state => state.list.list)
    const itemb = useSelector(state => state.item.item)

    if (!adding) {
        return (
            <div className="list_item-container">
                <div className="list_item-section">
                    <h3 className="item-header">{item.itemName}</h3>
                    <div className="list_item-notes">
                        {item.itemNotes}
                    </div>
                </div>
                <div className="form-button-container">
                    <button className="form-button" onClick={() => setEditing(true)}>Edit Item</button>
                </div>
            </div>
        )
    }
    else {
        return (
            <EditItem item={item} list_id={list_id} setAdding={setAdding} setEditing={setEditing} />
        )
    }
}


const List = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { listId } = useParams()

    const aList = useSelector(state => state.list.list)
    const items = useSelector(state => state.item.items)

    const [adding, setAdding] = useState(false)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        if (!aList.name) {
            dispatch(getList(listId))
        }
    }, [dispatch, adding, aList])


    return (
        <div className="list-container">
            <div className="list_details-container">
                <h3 className="list-name">{aList.name}</h3>
                <div className="list-notes" >{aList.notes}</div>
                <div className="list_add-item-container">
                    <button onClick={() => setAdding(true)} hidden={adding}>Add an Item</button>
                </div>
                <div className="list_add-item-container">
                    <button onClick={() => setAdding(false)} hidden={!adding}>cancel</button>
                </div>
            </div>
            {!adding && aList.items &&
                <div className="list-items-container">
                    {aList.items.map(item =>
                        <ItemDetails key={item.id} item={item} setAdding={setAdding} adding={adding} setEditing={setEditing} list_id={item.list_id} />)}
                </div>
            }
            {adding &&
                <NewItem alist={aList} setAdding={setAdding} />
            }
        </div>
    )

}
export default List;