import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../../services/auth";
import { getUser } from "../../store/user"
import { setLists, setTypes } from "../../store/list";
// import { getTrips } from "../../store/trip";
// import { setVehicles } from "../../store/vehicle";

const LoginForm = ({ authenticated, setAuthenticated }) => {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.user.user);

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {

      // if (!sessionUser) {
      //   dispatch(getUser(user.id))
      //   dispatch(setLists(user.id))
      //   dispatch(getTrips(user.id))
      //   dispatch(getTypes())
      //   // dispatch(setVehicles(user.id))
      // }

      setAuthenticated(true);
    } else {
      setErrors(user.errors);
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
