import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList, addList, dropList, getLists } from "../../store/list";
import ItemForm from "../Item"
import ListForm from "./ListForm"

const ListDetails = ({ adding, setAdding }) => {

    const items = useSelector(state => state.list.singleList.items)

    if (adding) {
        return <ListForm setAdding={setAdding} />
    }
    else {
        return (
            <div className="list_items-container">
                {items && items.map(item =>
                    <div className="list_item-section">
                        <div className="list_item_header-container">
                            <h3>{item.title}</h3>
                        </div>
                        <div className="list_item_notes-container">
                            <div>{item.notes}</div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

}


const List = (oneList) => {

    const dispatch = useDispatch();
    const list = useSelector(state => state.list.singleList)

    const [adding, setAdding] = useState(false)

    useEffect(() => {
        if (!list) {
            dispatch(getList(oneList.id))
        }
    }, [dispatch])

    const updateItems = (value) => {
        setAdding(value)
    }

    return (
        <div className="list-container">
            <div className="list_details-container">
                <div className="list_name-container">
                    <h3>{oneList.name}</h3>
                </div>
                <div className="list_notes-container">
                    <div>{oneList.notes}</div>
                </div>
                <div className="list_add-item-container">
                    <button onClick={() => updateItems(!adding)}>Add an Item</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
export default List;