const SET_VEHICLES = "user/SET_VEHICLES";
const ADD_CAR = "user/ADD_CAR";
const EDIT_CAR = 'user/EDIT_CAR';
const DROP_CAR = 'user/DROP_CAR';

const set_vehicles = (vehicles) => ({
    type: SET_VEHICLES,
    vehicles
})


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
        let newCars = await res.json()
        console.log(newCars)
        dispatch(set_vehicles(newCars.vehicles))
    }
}

export const getVehicles = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/vehicles`)
    const vehicles = await res.json()

    dispatch(set_vehicles(vehicles.vehicles))
}


function vehicleReducer(state = { vehicle: {}, vehicles: [] }, action) {
    switch (action.type) {
        case SET_VEHICLES:
            const newVehicles = [];
            for (let i = 0; i < action.vehicles.length; i++) {
                newVehicles.push(action.vehicles[i])
            }
            return { ...state, vehicles: newVehicles }
        case ADD_CAR:
            return { ...state, vehicles: [...state.vehicles, action.car] }
        default:
            return state

    }
}

export default vehicleReducer;