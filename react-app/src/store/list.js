import { setItems } from "./item"

const SET_LISTS = "list/SET_LISTS"
const SET_LIST = 'list/SET_LIST'

const set_Lists = (lists) => ({
    type: SET_LISTS,
    lists
})

const set_list = (list) => ({
    type: SET_LIST,
    list
})

export const setList = (list) => async (dispatch) => {
    // const res = await fetch('/api/lists/types')
    // dispatch(set_Types(await res.json()))
    // return await res.json()
    dispatch(set_list(list))

}

// export const getTypes = () => async (dispatch) => {
//     const res = await fetch('/api/lists/types')
//     const types = await res.json()
//     dispatch(set_Types(types.types))

// }

export const setLists = (lists) => async (dispatch) => {

    // async (dispatch) => {
    // const res = await fetch(`/api/users/${userId}/lists`)
    // if (res.ok) {
    //     const lists = await res.json()
    dispatch(set_Lists(lists))

}

export const getLists = (id) => async (dispatch) => {

    const res = await fetch(`/api/users/${id}/lists`)
    if (res.ok) {
        const data = await res.json()
        dispatch(set_Lists(data.lists))
    }

}



export const getList = (id) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}`)
    const data = await res.json()
    dispatch(set_list(data.list))
    dispatch(set_Lists(data.lists))
    dispatch(setItems(data.list.items))

}


export const addList = (list) => async (dispatch) => {
    const res = await fetch(`/api/users/${list.owner_id}/lists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(list)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(set_Lists(data.lists))
        console.log("hi")
    }
}

export const editList = (list) => async (dispatch) => {
    const res = await fetch(`/api/lists/${list.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(list)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(set_list(data))
    }
}

export const dropList = (listId) => async (dispatch) => {
    const res = await fetch(`/api/lists/${listId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(set_Lists(data.lists))
    }
}


function listReducer(state = { lists: [], list: {} }, action) {
    switch (action.type) {
        case SET_LISTS:
            let newLists = []
            for (let i = 0; i < action.lists.length; i++) {
                newLists.push(action.lists[i])
            }
            return { ...state, lists: newLists }
        case SET_LIST:
            return { ...state, list: action.list }
        default:
            return state;
    }
}

export default listReducer;