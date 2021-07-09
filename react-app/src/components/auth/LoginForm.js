import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../../services/auth";
import { setUser } from "../../store/user"
import { setLists } from "../../store/list";
import { setTrips } from "../../store/trip";
import { setVehicles } from "../../store/vehicle";

const LoginForm = ({ authenticated, setAuthenticated }) => {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.user.user);
  const lists = useSelector(state => state.list.lists)
  const trips = useSelector(state => state.trip.trips)
  const vehicles = useSelector(state => state.vehicle.vehicles)

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    console.log(sessionUser)
    e.preventDefault();
    const data = login(email, password, dispatch)
    console.log("3333333333333333333333333", data)
    if (!data.errors) {

      dispatch(setUser(data.user))
      dispatch(setLists(data.lists))
      dispatch(setTrips(data.trips))
      dispatch(setVehicles(data.vehicles))

      setAuthenticated(true);
    } else {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
