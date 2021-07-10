import React, { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addList, dropList, getList, getLists, setList } from "../../store/list";
import { getTypes } from "../../store/type";
import { getUser } from "../../store/user";
import { setItems } from "../../store/item";
import ListForm from "./ListForm";



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
            <div className="new-list-button" onClick={() => setAdding(true)} hidden={adding}>
                Add New List
            </div>
            <div className="new-list_cancel-button" onClick={() => setAdding(false)} hidden={!adding}>
                Cancel
            </div>
            {!adding &&
                <div className="lists-container">
                {lists && lists.map(list =>
                    <div key={list.id} className="list-peek_row-container">
                        <div className="list-peek_header-container">
                            <h3>{list.name}</h3>
                        </div>
                        <div className="list-peek_details-container">
                            {/* <div>{selectedType(list)}</div> */}
                            <div>{list.type_of.name}</div>
                        </div>
                        <div className="list-peek_notes-container">
                            <div>{list.notes}</div>
                        </div>
                        <div>
                            <button type="button" onClick={() => goToList(list)}> See Details</button>
                        </div>
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