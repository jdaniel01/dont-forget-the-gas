import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList, addItem, dropItem } from "../../store/list";
import { getItems } from "../../store/item";
import { NewItem, EditItem } from "../Item/Forms"
import Item from "../Item"

const ItemDetails = ({ item, setAdding, adding }) => {

    const [editing, setEditing] = useState(false)
    const listId = useSelector(state => state.item.item.list_id)
    const items = useSelector(state => state.item.items)

    if (!adding) {
        return (
            <div className="list_items-container">
                <div className="list_item-section">
                    <div className="list_item_header-container">
                        <h3>{item.itemName}</h3>
                    </div>
                    <div className="list_item_notes-container">
                        <div>{item.itemNotes}</div>
                    </div>
                    <div className="list_item-section">
                        {item.list_id}
                    </div>
                </div>
                <div className="list_item-edit-button" onClick={() => setEditing(true)}>
                    Edit Item
                </div>
            </div>
        )
    }
    else {
        return (
            <EditItem item={item} list_id={item.list_id} setAdding={setAdding} />
        )
    }

}


const List = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const aList = useSelector(state => state.list.list)
    const items = useSelector(state => state.list.list.items)

    const [adding, setAdding] = useState(false)


    useEffect(() => {
        if (!aList) {
            dispatch(getList(aList.id))
            console.log(aList.id)
        }
    }, [dispatch])


    return (
        <div className="list-container">
            <div className="list_details-container">
                <div className="list_name-container">
                    <h3>{aList.name}</h3>
                </div>
                <div className="list_notes-container">
                    <div>{aList.notes}</div>
                </div>
                <div className="list_add-item-container">
                    <button onClick={() => setAdding(true)} hidden={adding}>Add an Item</button>
                </div>

                <div className="list_add-item-container">
                    <button onClick={() => setAdding(false)} hidden={!adding}>cancel</button>
                </div>
            </div>
            <div>
                {!adding && aList.items &&
                    <div>
                        {aList.items.map(item =>
                            <ItemDetails key={item.id} item={item} setAdding={setAdding} adding={adding} />)}
                    </div>
                }
                {adding &&
                    <NewItem alist={aList.id} setAdding={setAdding} />
                }
            </div>
        </div>
    )

}
export default List;