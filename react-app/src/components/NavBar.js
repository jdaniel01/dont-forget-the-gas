import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { logout } from "../services/auth";
import { getUser } from "../store/user"
import "../index.css";

const NavBar = ({ setAuthenticated, authenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const onLogout = async () => {
    await logout()
    setAuthenticated(false)
  }

  useEffect(() => {
    if (!user) {
      dispatch(getUser(user))
    }
  })

  return (
    <nav className="navbar">
      <div className="nav-links">
        <div className="link_navlink">
          <NavLink to="/about" className="NavLink" exact={true} activeClassName="active">
            About
          </NavLink>
        </div>
        {!authenticated &&
          <>
            <div className="link_navlink">
              <NavLink to="/" className="NavLink" exact={true} activeClassName="active">
                Home
              </NavLink>
            </div>
            <div className="link_navlink">
              <NavLink to="/login" className="NavLink" exact={true} activeClassName="active">
                Login
              </NavLink>
            </div>
            <div className="link_navlink">
              <NavLink to="/sign-up" className="NavLink" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </div>
          </>
        }
        {authenticated &&
          <>
            <div className="link_navlink">
            <NavLink to="/" exact={true} className="NavLink" activeClassName="active">
                Main
              </NavLink>
            </div>
            <div>
            <NavLink to={`/users/${user.id}/lists`} className="NavLink" exact={true} activeClassName="active">
                Lists
              </NavLink>
            </div>
            <div>
            <NavLink to={`/users/${user.id}/trips`} className="NavLink" exact={true} activeClassName="active">
                Trips
              </NavLink>
          </div>
          <div>
            <NavLink to={`/users/${user.id}`} className="NavLink" exact={true} activeClassName="active">
              My Stuff
              </NavLink>
          </div>
            <div className="link_navlink">
            <button className="NavLink button" onClick={onLogout}>Logout</button>
            </div>
          </>
        }
      </div>
    </nav>
  );
}

export default NavBar;