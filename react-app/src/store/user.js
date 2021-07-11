import { setLists } from "./list";
// import { setTrips } from "./trip";
import { setVehicles } from "./vehicle";

const SET_USER = "user/SET_USER";

const set_User = (user) => ({
    type: SET_USER,
    user
})



// export const addUser = (user) => async (dispatch) => {
//     dispatch(blendUser(user))
// }

export const setUser = (user) => async (dispatch) => {
    // const res = await fetch(`/api/users/${id}`)
    // if (res.ok) {
    //     const user = await res.json();
    //     if (user.errors) {
    //         return user
    //     }
    console.log(user)
    dispatch(set_User(user))
    // }
}

export const getUser = () => async (dispatch) => {
    const res = await fetch(`/api/auth/`)
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data
        }
        dispatch(set_User(data.user))
        dispatch(setLists(data.lists))
        // dispatch(setTrips(data.trips))
        dispatch(setVehicles(data.vehicles))
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
        if (user.errors) {
            return user
        }
        dispatch(set_User(user))
    }
}

function userReducer(state = { user: {}, users: [] }, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        // case EDIT_USER:
        //     return { ...state, user: action.user }
        default:
            return state;
    }
}

export default userReducer;