const SET_USER = "user/SET_USER";
const EDIT_USER = "user/EDIT_USER";

const setUser = (user) => ({
    type: SET_USER,
    user
})

const editedUser = (user) => ({
    type: EDIT_USER,
    user
})

export const getUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`)
    if (res.ok) {
        const user = await res.json();
        if (user.errors) {
            return user
        }
        dispatch(setUser(user))
    }
}

export const editUser = (user) => async (dispatch) => {
    const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    if (res.ok) {
        const user = await res.json()
        if (user.errors.length) {
            return user
        }
        dispatch(editedUser(user))
    }
}

function userReducer(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return action.user
        case EDIT_USER:
            return action.user
        default:
            return state;
    }
}

export default userReducer;