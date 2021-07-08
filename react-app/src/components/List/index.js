import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList, addItem, dropItem } from "../../store/list";
import { getItems } from "../../store/item";
import { NewItem, EditItem } from "../Item/Forms"
import Item from "../Item"

const ItemDetails = ({ item }) => {

    const [editing, setEditing] = useState(false)
    const updateEditing = (value) => {
        setEditing(value)
    }
    if (!editing) {
        return (
            <div className="list_items-container">
                <div className="list_item-section">
                    {/* <div className="list_item_header-container">
                        <h3>{item.name}</h3>
                    </div>
                    <div className="list_item_notes-container">
                        <div>{item.notes}</div>
                    </div> */}
                    <div className="list_item-section">
                        {item.list_id}
                    </div>
                </div>
                <div className="list_item-edit-button" onClick={updateEditing(true)}>
                    Edit Item
                </div>
            </div>
        )
    }
    else {
        return (
            <EditItem item={item} list_id={item.list_id} setEditing={setEditing} />
        )
    }

}


const List = () => {

    const dispatch = useDispatch();
    const listid = useParams();
    const listId = Number(listid);
    const list = useSelector(state => state.list.list)
// need to accept new list data type

    const [adding, setAdding] = useState(false)

    // useEffect(() => {
    //     if (!items) {
    //         dispatch(getItems(listId))
    //     }
    // }, [dispatch, items])

    const updateItems = (value) => {
        console.log("###############$#$#$#", listid, listId, list)
        setAdding(value)
    }


    return (
        <div className="list-container">
            <div className="list_details-container">
                <div className="list_name-container">
                    <h3>{list.name}</h3>
                </div>
                <div className="list_notes-container">
                    <div>{list.notes}</div>
                </div>
                <div className="list_add-item-container">
                    <button onClick={() => updateItems(true)} hidden={adding}>Add an Item</button>
                </div>

                <div className="list_add-item-container">
                    <button onClick={() => updateItems(false)} hidden={!adding}>cancel</button>
                </div>
            </div>
            {!adding &&
                <div>
                {list.items.map(item =>
                        <ItemDetails key={item.id} item={item} />
                    )}
                </div>
            }
            {adding &&
                <NewItem list_id={listId} updateItems={updateItems} />
            }
        </div>
    )

}
export default List;