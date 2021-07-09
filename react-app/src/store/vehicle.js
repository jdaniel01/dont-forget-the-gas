const SET_VEHICLES = "vehicle/SET_VEHICLES";
const SET_VEHICLE = "vehicle/SET_VEHICLES";
// const ADD_CAR = "user/ADD_CAR";
// const EDIT_CAR = 'user/EDIT_CAR';
// const DROP_CAR = 'user/DROP_CAR';

const set_vehicles = (vehicles) => ({
    type: SET_VEHICLES,
    vehicles
})

const set_vehicle = (vehicle) => ({
    type: SET_VEHICLE,
    vehicle
})

export const setVehicles = (vehicles) => async (dispatch) => {
    console.log("############################VEHICLES", vehicles)
    dispatch(set_vehicles(vehicles))
}

export const addVehicle = (vehicle) => async (dispatch) => {
    console.log("^^^^^^^^^^^^^^^^Vehicle", vehicle)
    const res = await fetch(`/api/users/${vehicle.owner_id}/vehicles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vehicle)
    })
    if (res.ok) {
        let data = await res.json()
        console.log(data)
        dispatch(set_vehicles(data.vehicles))
    }
}

export const getVehicles = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/vehicles`)

    const data = await res.json()

    dispatch(set_vehicles(data.vehicles))
}


function vehicleReducer(state = { vehicle: {}, vehicles: [] }, action) {
    switch (action.type) {
        case SET_VEHICLES:
            const newVehicles = [];
            for (let i = 0; i < action.vehicles.length; i++) {
                newVehicles.push(action.vehicles[i])
            }
            return { ...state, vehicles: newVehicles }
        case SET_VEHICLE:
            return { ...state, vehicle: action.vehicle }
        default:
            return state

    }
}

export default vehicleReducer;