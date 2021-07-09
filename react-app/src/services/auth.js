import { setLists } from "../store/list";
import { setTrips } from "../store/trip";
import { setVehicles } from "../store/vehicle";
import { setUser } from "../store/user";

export const authenticate = async () => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const login = async (email, password, dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user))
  dispatch(setVehicles(data.vehicles))
  dispatch(setTrips(data.trips))
  dispatch(setLists(data.lists))
}

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};


export const signUp = async (username, email, password, about) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      about
    }),
  });
  return await response.json();
}