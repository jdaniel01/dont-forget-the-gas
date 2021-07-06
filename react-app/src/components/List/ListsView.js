import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addList, dropList, getCollection } from "../../store/list";


const ListPeek = ({ list }) => {

    const [background, setBackground] = useState(list.type.color)

    useEffect(() => {
        if (!background) {
            setBackground(list.type.color)
            //TODO need to add inline background styling to the ListPeek lists. add color and hover effects.
        }
    }, [list])

    return (
        <div className="list-peek_row-container" onClick={() => Redirect(`/lists/${list.id}`)}>
            <div className="list-peek_header-container">
                <h3>{list.name}</h3>
            </div>
            <div className="list-peek_details-container">
                <div>{list.type.name}</div>
            </div>
            <div className="list-peek_notes-container">
                <div>{list.notes}</div>
            </div>
        </div>
    )
}


const ListsView = () => {

    const dispatch = useDispatch();

    const lists = useSelector(state => state.user.lists)
    const user = useSelector(state => state.user)


    return (
        <div className="lists-view-container">
            <div className="lists-view_header-container">
                <h2>Your Lists</h2>
            </div>
            <div className="lists-container">
                {lists && lists.map(list => <ListPeek key={list.id} list={list} />)}
            </div>
        </div>
    )
}

export default ListsView;