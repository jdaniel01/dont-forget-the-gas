const SET_COLLECTION = "list/SET_COLLECTION"
// const ADD_ONE_LIST = "list/ADD_ONE_LIST"
// const DROP_ONE_LIST = "list/DROP_ONE_LIST"
// const EDIT_ONE_LIST = "list/EDIT_ONE_LIST"


const setCollection = (collection) => ({
    type: SET_COLLECTION,
    collection
})

// const editList = (list) => ({
//     type: EDIT_ONE_LIST,
//     list
// })

// const addList = (list) => ({
//     type: ADD_ONE_LIST,
//     list
// })

// const dropList = (id) => ({
//     type: DROP_ONE_LIST,
//     id
// })



export const getCollection = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/lists`)
    if (res.ok) {
        const lists = await res.json()
        dispatch(setCollection(lists))
    }
}

export const addList = (list) => async (dispatch) => {
    const res = await fetch(`/api/users/${list.owner_id}/lists`, {
        method: "POST",
        headers: {
            "Content_Type": "application/json"
        },
        body: JSON.stringify(list)
    })
    if (res.ok) {
        dispatch(setCollection(lists))
    }
}

export const editList = (list) => async (dispatch) => {
    const res = await fetch(`/api/users/${list.owner_id}/lists/${list.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(list)
    })
    if (res.ok) {
        dispatch(setCollection(lists))
    }
}

export const dropList = (list) => async (dispatch) => {
    const res = await fetch(`/api/users/${list.owner_id}/lists/${list.id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(setCollection(lists))
    }
}


function listReducer(state = { collection: [] }, action) {
    switch (action.type) {
        case SET_COLLECTION:
            let newCollection = []
            for (let list in action.collection) {
                newCollection.push(action.collection[list])
            }
            return { ...state, collection: newCollection }
        default:
            return state;
    }
}

export default listReducer;