const SET_COLLECTION = "list/SET_COLLECTION"


const setCollection = (collection) => ({
    type: SET_COLLECTION,
    collection
})

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
        const lists = await res.json()
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
        const lists = await res.json()
        dispatch(setCollection(lists))
    }
}

export const dropList = (list) => async (dispatch) => {
    const res = await fetch(`/api/users/${list.owner_id}/lists/${list.id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const lists = await res.json()
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