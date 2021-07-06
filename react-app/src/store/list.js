const SET_COLLECTION = "list/SET_COLLECTION"
const SET_LIST = 'list/SET_LIST'
const SET_TYPES = 'list/SET_TYPES'

const setCollection = (collection) => ({
    type: SET_COLLECTION,
    collection
})

const setList = (list) => ({
    type: SET_LIST,
    list
})

const setTypes = (types) => ({
    type: SET_TYPES,
    types
})

export const getTypes = () => async (dispatch) => {
    const res = await fetch('/api/lists/types')
    dispatch(setTypes(await res.json()))
    return await res.json()
}

export const getCollection = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/lists`)
    if (res.ok) {
        const lists = await res.json()
        dispatch(setCollection(lists))
    }
}

export const getList = (id) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}`)
    const aList = await res.json()
    dispatch(setList(aList))
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


function listReducer(state = { collection: [], list: {}, types: [] }, action) {
    switch (action.type) {
        case SET_COLLECTION:
            let newCollection = []
            for (let list in action.collection) {
                newCollection.push(action.collection[list.to_dict()])
            }
            return { ...state, collection: newCollection }
        case SET_LIST:
            return { ...state, list: action.list }
        case SET_TYPES:
            let newTypes = []
            for (let type in action.types) {
                newTypes.push(type)
            }
            return { ...state, types: newTypes }
        default:
            return state;
    }
}

export default listReducer;