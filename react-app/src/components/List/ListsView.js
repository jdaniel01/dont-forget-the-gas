import React, { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addList, dropList, getList, getLists, setList } from "../../store/list";
import { getTypes } from "../../store/type";
import { getUser } from "../../store/user";
import { setItems } from "../../store/item";
import ListForm from "./ListForm";
import "./List.css"


const ListsView = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const types = useSelector(state => state.type.types)
    const lists = useSelector(state => state.list.lists)
    const user = useSelector(state => state.user.user)

    const [adding, setAdding] = useState(false)


    useEffect(() => {
        if (!user.username) {
            dispatch(getUser())
        }
        if (!lists.length) {
            dispatch(getLists(user.id))
        }
        if (!types.length) {
            dispatch(getTypes())
        }
    }, [dispatch, lists, user, types])


    const goToList = async (list) => {
        dispatch(setList(list))
        dispatch(setItems(list.items))
        history.push(`/lists/${list.id}`)
    }

    return (
        <div className="lists-view-container">
            <div className="lists-view_header-container">
                <h2>Your Lists</h2>
            </div>
            <div className="list-button-container">
                <div className="new-list-button" onClick={() => setAdding(true)} hidden={adding}>
                    Add New List
                </div>
                <div className="new-list_cancel-button" onClick={() => setAdding(false)} hidden={!adding}>
                    Cancel
                </div>
            </div>
            {!adding &&
                <div className="lists-container">
                {lists && lists.map(list =>
                    <div key={list.id} className="list-peek_row-container">
                        <h3 className='header' style={{ backgroundColor: list.type_of.color, color: "white" }}>{list.name}</h3>
                        <div className="list-peek_notes">{list.notes}</div>
                        <button type="button" className="button" onClick={() => goToList(list)}> See Details</button>
                    </div>
                )}
                </div>
            }
            {adding &&
                <ListForm setAdding={setAdding} />
            }
        </div>
    )
}


export default ListsView;