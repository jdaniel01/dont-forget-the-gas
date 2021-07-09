import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/User/UsersList";
import User from "./components/User";
import Map from './components/Map';
import About from './components/About';
import List from './components/List';
import Profile from './components/User/Profile';
import ListsView from './components/List/ListsView';
import Splash from "./components/Splash";
import Trip from "./components/Trip"
import TripsView from "./components/Trip/TripsView"
import { setUser } from "./store/user";
import { getLists } from "./store/list";
import { getTrips } from "./store/trip";
import { getVehicles } from "./store/vehicle";
import { getTypes } from "./store/type";

import { authenticate } from "./services/auth";
import "./index.css"


function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user.id) {
        const user = await authenticate();
        if (!user.errors) {
          dispatch(setUser(user))
          dispatch(getLists(user.id))
          dispatch(getTypes())
          dispatch(getVehicles(user.id))
          dispatch(getTrips(user.id))
          setAuthenticated(true);
        }
        setLoaded(true);
      }
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/about" exact={true}>
          <About />
        </Route>
        <ProtectedRoute path="/users/:userId/lists" exact={true} authenticated={authenticated}>
          <ListsView />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId/trips" exact={true} authenticated={authenticated}>
          <TripsView />
        </ProtectedRoute>
        <ProtectedRoute path="/lists/:listId" exact={true} authenticated={authenticated}>
          <List />
        </ProtectedRoute>
        <ProtectedRoute path="/trips/:tripId" exact={true} authenticated={authenticated}>
          <Trip />
        </ProtectedRoute>
        {/* <ProtectedRoute path="/items/:itemId" exact={true} authenticated={authenticated}>
          <Forms
        </ProtectedRoute> */}
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>TODO: Create non-user splash</h1>
          <Map />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;