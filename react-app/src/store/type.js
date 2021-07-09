const SET_TYPES = "type/SET_TYPES"
const SET_TYPE = 'type/SET_TYPE'

const setTypes = (types) => ({
    type: SET_TYPES,
    types
})

const setType = (type) => ({
    type: SET_TYPE,
    type
})

export const getTypes = () => async (dispatch) => {
    const res = await fetch(`/api/lists/types`)
    if (res.ok) {
        const data = await res.json()
        console.log(data.types)
        dispatch(setTypes(data.types))
    }
}



export const addType = (type) => async (dispatch) => {
    const res = await fetch(`/api/types`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(type)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(setTypes(data.types))
    }
}

export const editType = (type) => async (dispatch) => {
    const res = await fetch(`/api/lists/types/${type.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(type)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(setTypes(data.types))
    }
}

export const dropType = (typeId) => async (dispatch) => {
    const res = await fetch(`/api/lists/types/${typeId}`, {
        method: "DELETE"
    })
    // if (res.ok) {
    //     const data = await res.json()
    //     dispatch(setTypes(data.types))
    // }
}

function typeReducer(state = { types: [], type: {} }, action) {
    switch (action.type) {
        case SET_TYPES:
            let newTypes = []
            for (let i = 0; i < action.types.length; i++) {
                newTypes.push(action.types[i])
            }
            return { ...state, types: action.types }
        case SET_TYPE:
            return { ...state, type: action.type }
        default:
            return state;
    }
}

export default typeReducer;

