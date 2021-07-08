const SET_TYPES = "type/SET_TYPES"
const SET_TYPE = 'type/SET_TYPE'

const setTypes = (collection) => ({
    type: SET_TYPES,
    collection
})

const setList = (list) => ({
    type: SET_TYPE,
    list
})

export const getTypes = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/types`)
    if (res.ok) {
        const types = await res.json()
        dispatch(setTypes(types))
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
        dispatch(setTypes(lists))
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
        dispatch(setTypes(lists))
    }
}

export const dropList = (list) => async (dispatch) => {
    const res = await fetch(`/api/users/${list.owner_id}/lists/${list.id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const lists = await res.json()
        dispatch(setTypes(lists))
    }
}

