import { Redirect } from "react-router-dom";

const SET_USER = "user/SET_USER";
const EDIT_USER = "user/EDIT_USER";
const SET_VEHICLES = "user/SET_VEHICLES";
const ADD_CAR = "user/ADD_CAR";
const EDIT_CAR = 'user/EDIT_CAR';
const DROP_CAR = 'user/DROP_CAR';

const set_vehicles = (vehicles) => ({
    type: SET_VEHICLES,
    vehicles
})

const set_User = (user) => ({
    type: SET_USER,
    user
})

const addCar = (car) => ({
    type: ADD_CAR,
    car
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
    dispatch(set_User(user))
    // }
}

export const addVehicle = (vehicle) => async (dispatch) => {
    const res = await fetch(`/api/users/${vehicle.owner_id}/vehicles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vehicle)
    })
    if (res.ok) {
        let newCar = await res.json()
        dispatch(addCar(newCar))
        return Redirect(`/users/${newCar.owner_id}`)
    }
}

export const setVehicles = (vehicles) => async (dispatch) => {
    dispatch(set_vehicles(vehicles))
}

export const getUser = () => async (dispatch) => {
    const res = await fetch(`/api/auth/`)
    if (res.ok) {
        const user = await res.json();
        if (user.errors) {
            return user
        }
        dispatch(set_User(user))
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
        dispatch(set_User(user))
    }
}

function userReducer(state = { user: {}, vehicles: [] }, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case EDIT_USER:
            return { ...state, user: action.user }
        case SET_VEHICLES:
            return { ...state, vehicles: action.vehicles }
        case ADD_CAR:
            return { ...state, vehicles: [...state.vehicles, action.car] }
        default:
            return state;
    }
}

export default userReducer;