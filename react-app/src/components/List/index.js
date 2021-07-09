import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList, addItem, dropItem } from "../../store/list";
import { getItems } from "../../store/item";
import { NewItem, EditItem } from "../Item/Forms"
import Item from "../Item"

const ItemDetails = ({ item }) => {

    const [editing, setEditing] = useState(false)

    if (!editing) {
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
            <EditItem item={item} list_id={item.list_id} setEditing={setEditing} />
        )
    }

}


const List = () => {

    const dispatch = useDispatch();
    const listid = useParams();
    const listId = Number(listid);

    const aList = useSelector(state => state.list.list)

// need to accept new list data type

    const [adding, setAdding] = useState(false)
    const [details, setDetails] = useState()

    useEffect(() => {
        if (!aList) {
            dispatch(getList(listId))
            console.log(aList)
        }
    }, [dispatch, aList])



    useEffect(() => {
        if (!adding) {
            setDetails(
                <>
                    {aList.items.map(item =>
                        <ItemDetails key={item.id} item={item} />
                    )}
                </>
            )
        }
        else if (adding) {
            setDetails(
                <>
                    <NewItem list_id={listId} setAdding={setAdding} />
                </>
            )

        }

    }, [adding])

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
            {!adding &&
                aList.items.map(item =>
                    <ItemDetails key={item.id} item={item} />)


            }
            {adding &&
                <>
                    <NewItem list_id={listId} setAdding={setAdding} />
                </>
            }
        </div>
    )

}
export default List;