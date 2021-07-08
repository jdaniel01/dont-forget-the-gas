import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList, addItem, dropItem, getItems } from "../../store/list";
import ItemForm from "../Item/ItemForm"
import Item from "../Item"

const ItemDetails = ({ item, updateAdding }) => {

        return (
            <div className="list_items-container">
                <div className="list_item-section">
                    <div className="list_item_header-container">
                        <h3>{item.title}</h3>
                    </div>
                    <div className="list_item_notes-container">
                        <div>{item.notes}</div>
                    </div>
                </div>
                <div className="list_item-edit-button" onClick={updateAdding(true)}>
                    Edit Item
                </div>
            </div>
        )
    // }

}


const List = () => {

    const dispatch = useDispatch();
    const listId = useParams();
    const list = useSelector(state => state.list.list)
    const items = useSelector(state => state.item.items)

    const [adding, setAdding] = useState(false)

    useEffect(() => {
        if (!list) {
            dispatch(getList(listId))
        }
    }, [dispatch])

    const updateItems = (value) => {
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
                    <button onClick={() => updateItems(true)}>Add an Item</button>
                </div>
            </div>
            {adding &&
                <ItemForm />
            }
            {!adding && items.map(item =>
                <>
                    <ItemDetails key={item.id} item={item} updateItems={updateItems} />
                </>
            )}

        </div>
    )
}
export default List;