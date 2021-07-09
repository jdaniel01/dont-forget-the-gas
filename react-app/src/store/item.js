const SET_ITEMS = "item/SET_ITEMS"
const SET_ITEM = 'item/SET_ITEM'

const setItems = (items) => ({
    type: SET_ITEMS,
    items
})

export const getItems = (listId) => async (dispatch) => {
    const res = await fetch(`/api/lists/${listId}/items`)
    if (res.ok) {
        console.log("############GOT ITEMS######## store")
        const data = await res.json()
        dispatch(setItems(data.items))
    }
}


export const addItem = (item) => async (dispatch) => {
    const res = await fetch(`/api/lists/${item.list_id}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(setItems(data.items))
    }
}

export const editItem = (item) => async (dispatch) => {
    const res = await fetch(`/api/items/${item.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
    if (res.ok) {
        const data = await res.json()
        console.log("####################RES#OK###############", data.items)

        dispatch(setItems(data.items))
    }
}

export const dropItem = (item) => async (dispatch) => {
    const res = await fetch(`/api/items/${item.id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(setItems(data.items))
    }
}


function itemReducer(state = { items: [], item: {} }, action) {
    switch (action.type) {
        case SET_ITEMS:
            let newItems = []
            for (let i = 0; i < action.items.length; i++) {
                newItems.push(action.items[i])
            }
            return { ...state, items: newItems }
        case SET_ITEM:
            return { ...state, item: action.item }
        default:
            return state;
    }
}

export default itemReducer;