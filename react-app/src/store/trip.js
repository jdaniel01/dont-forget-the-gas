const SET_TRIPS = "trip/SET_TRIPS"
const SET_TRIP = 'trip/SET_TRIP'

const setTrips = (trips) => ({
    type: SET_TRIPS,
    trips
})

const setTrip = (trip) => ({
    type: SET_TRIP,
    trip
})

export const getTrips = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/trips`)
    if (res.ok) {
        const trips = await res.json()
        console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', trips, typeof trips)
        dispatch(setTrips(trips))
    }
}

export const getTrip = (id) => async (dispatch) => {
    const res = await fetch(`/api/trips/${id}`)
    const atrip = await res.json()
    dispatch(setTrip(atrip))
}


export const addtrip = (trip) => async (dispatch) => {
    const res = await fetch(`/api/users/${trip.owner_id}/trips`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trip)
    })
    if (res.ok) {
        const trips = await res.json()
        dispatch(setTrips(trips))
    }
}

export const editTrip = (trip) => async (dispatch) => {
    const res = await fetch(`/api/trips/${trip.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trip)
    })
    if (res.ok) {
        const trips = await res.json()
        dispatch(setTrips(trips))
    }
}

export const droptrip = (trip) => async (dispatch) => {
    const res = await fetch(`/api/trips/${trip.id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const trips = await res.json()
        dispatch(setTrips(trips))
    }
}


function tripReducer(state = { trips: [], trip: {} }, action) {
    switch (action.type) {
        case SET_TRIPS:
            let newtrips = []
            for (let trip in action.trips) {
                newtrips.push(action.trips[trip.to_dict()])
            }
            return { ...state, trips: newtrips }
        case SET_TRIP:
            return { ...state, trip: action.trip }
        default:
            return state;
    }
}

export default tripReducer;