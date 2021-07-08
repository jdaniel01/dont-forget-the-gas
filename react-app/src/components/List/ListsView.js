import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addList, dropList, getList, getLists } from "../../store/list";
import { getTypes } from "../../store/type";
import { getUser } from "../../store/user";
import ListForm from "./ListForm";



const ListsView = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const types = useSelector(state => state.type.types)
    const lists = useSelector(state => state.list.lists)
    const user = useSelector(state => state.user.user)

    const [adding, setAdding] = useState(false)

    const updateAdding = () => {
        setAdding(true)
    }


    useEffect(() => {
        if (!user) {
            dispatch(getUser(user.id))
        }
        if (!lists) {
            dispatch(getLists(user.id))
        }
        if (!types) {
            dispatch(getTypes())
        }
    }, [dispatch, lists, user, types])

    const selectedType = (list) => {
        for (let i = 0; i < types.length; i++) {
            if (types[i].id === list.type_id) {
                return types[i].name
            }
        }
        return "ERROR";
    }
    // const goToPage = () => {
    //     const page = `/lists/${list.id}`
    //     history.push(`/lists/${list.id}`);
    // }

    // const listFeature = () => {
        //     if (!adding) {
            //         return (
                //             <div className="lists-container">
                //                 {lists.map(list => <ListPeek key={list.id} list={list} />)}
                //             </div>
                //         )
                //     }
                //     else if (adding) {
                    //         return <ListForm setAdding={setAdding} />
                    //     }
                    // }


    useEffect(() => {
        setAdding(false)
    }, [lists])

    return (
        <div className="lists-view-container">
            <div className="lists-view_header-container">
                <h2>Your Lists</h2>
            </div>
            <div className="new-list-button" onClick={updateAdding} hidden={adding}>
                Add New List
            </div>
            <div className="new-list_cancel-button" onClick={() => setAdding(false)} hidden={!adding}>
                Cancel
            </div>
            {!adding &&
                <div className="lists-container">
                {lists && lists.map(list =>
                    <div className="list-peek_row-container" onClick={() => history.push(`/lists/${list.id}`)}>
                        <div className="list-peek_header-container">
                            <h3>{list.name}</h3>
                        </div>
                        <div className="list-peek_details-container">
                            <div>{selectedType(list)}</div>
                        </div>
                        <div className="list-peek_notes-container">
                            <div>{list.notes}</div>
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
// const ListPeek = ({ list }) => {

//     const dispatch = useDispatch();
//     // const [background, setBackground] = useState(aList.type_of.color)
//     const history = useHistory();
//     const types = useSelector(state => state.list.types)

//     // useEffect(() => {
//     //     if (!types) {
//     //         dispatch(getTypes())
//     //     }
//     // })


//     // const selectedType = (types) => {
//     //     for (let i = 0; i < types.length; i++) {
//     //         if (types[i].id === list.type_id) return types[i]
//     //     }
//     //     return null;
//     // }

//     // useEffect(() => {
//     //     if (!background) {
//     //         setBackground(aList.type_of.color)
//     //         //TODO need to add inline background styling to the ListPeek lists. add color and hover effects.
//     //     }
//     // }, [aList])

//     // const goToPage = () => {
//     //     const page = `/lists/${list.id}`
//     //     history.push(page);
//     // }

//     return (
//         <div className="list-peek_row-container" onClick={goToPage}>
//             <div className="list-peek_header-container">
//                 <h3>{list.name}</h3>
//             </div>
//             <div className="list-peek_details-container">
//                 <div>{list.type_of.name}</div>
//             </div>
//             <div className="list-peek_notes-container">
//                 <div>{list.notes}</div>
//             </div>
//         </div>
//     )
// }

export default ListsView;