import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList, addItem, dropItem } from "../../store/list";
import { getItems } from "../../store/item";
import { NewItem, EditItem } from "../Item/Forms"
import Item from "../Item"

const ItemDetails = ({ item, setAdding, adding, list_id }) => {

    const [editing, setEditing] = useState(false)

    const dispatch = useDispatch()

    const currList = useSelector(state => state.list.list)
    const itemb = useSelector(state => state.item.item)

    useEffect(() => {
        if (adding && !editing) {

            setAdding(false)
        }
    }, [editing])

    return (
        <>
            {!editing &&
            <div className="list_items-container">
                <div className="list_item-section">
                    <div className="list_item_header-container">
                        <h3>{item.itemName}</h3>
                    </div>
                    <div className="list_item-secion">
                        {item.itemNotes}
                    </div>
                    <div className="list_item-section">
                        {item.list_id}
                    </div>
                </div>
                <div className="list_item-edit-button" onClick={() => setEditing(true)}>
                    Edit Item
                </div>
            </div>

            }
            {editing &&
                <EditItem item={item} list_id={list_id} setEditing={setEditing} />
            }
        </>
    )
}


const List = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { listId } = useParams()

    const aList = useSelector(state => state.list.list)
    const items = useSelector(state => state.item.items)

    const [adding, setAdding] = useState(false)


    useEffect(() => {
        if (!aList) {
            dispatch(getList(listId))
        }

    }, [dispatch, adding])


    return (
        <div className="list-container">
            <div className="list_details-container">
                <div className="list_name-container">
                    <h3 className="list-name">{aList.name}</h3>
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
                            <ItemDetails key={item.id} item={item} setAdding={setAdding} adding={adding} list_id={aList.id} />)}
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