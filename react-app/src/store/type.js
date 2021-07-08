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
        const types = await res.json()
        console.log(types.types)
        dispatch(setTypes(types.types))
    }
}



export const addType = (type) => async (dispatch) => {
    const res = await fetch(`/api/lists/types`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(type)
    })
    if (res.ok) {
        const types = await res.json()
        dispatch(setTypes(types.types))
    }
}

export const editType = (type) => async (dispatch) => {
    const res = await fetch(`/api/lists/${type.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(type)
    })
    if (res.ok) {
        const types = await res.json()
        dispatch(setTypes(types.types))
    }
}

export const dropType = (type) => async (dispatch) => {
    const res = await fetch(`/api/types/${type.id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const types = await res.json()
        dispatch(setTypes(types.types))
    }
}

function typeReducer(state = { types: [] }, action) {
    switch (action.type) {
        case SET_TYPES:
            // let newTypes = []
            // for (let i = 0; i < action.types.length; i++) {
            //     newTypes.push(action.types[i])
            // }
            return { types: action.types }
        case SET_TYPE:
            return action.type
        case SET_TYPES:
            let newTypes2 = []
            for (let i = 0; i < action.types.length; i++) {
                newTypes2.push(action.types[i])
            }
            return { types: newTypes2 }
        default:
            return state;
    }
}

export default typeReducer;

