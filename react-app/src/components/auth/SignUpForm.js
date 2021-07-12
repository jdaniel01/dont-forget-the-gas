import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp, loginDemoUser } from '../../services/auth';
import { setUser } from "../../store/user"
import { setLists } from "../../store/list";
import { setTrips } from "../../store/trip";
import { setVehicles } from "../../store/vehicle";

const SignUpForm = ({ authenticated, setAuthenticated }) => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, about);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateAbout = (e) => {
    setAbout(e.target.value);
  }

  const demoLogin = async () => {
    const demoUser = await loginDemoUser()
    dispatch(setUser(demoUser.user))
    dispatch(setLists(demoUser.lists))
    dispatch(setTrips(demoUser.trips))
    dispatch(setVehicles(demoUser.vehicles))

    setAuthenticated(true)
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-container">
      <form onSubmit={onSignUp}>
        <div className="form-errors-container">
          {errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </div>
        <div className="form-input-container">
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
        <div className="form-input-container">
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
        <div className="form-input-container">
        <label>About</label>
        <textarea type="text" name="about" onChange={updateAbout} value={about} />
      </div>
        <div className="form-input-container">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
        <div className="form-input-container">
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
        <div className="form-button-container">
          <button type="submit" className="form-button">Sign Up</button>
        </div>
        <div className="form-button-container">
          <button className="form-button demo" onClick={demoLogin}>Demo</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
