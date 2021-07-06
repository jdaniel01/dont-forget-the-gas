import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { logout } from "../services/auth";

const NavBar = ({ setAuthenticated, authenticated }) => {

  const user = useSelector(state => state.user)

  const onLogout = async (e) => {
    e.prevent.Default()
    await logout()
    setAuthenticated(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
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
              <NavLink to="/" exact={true} activeClassName="active">
                Main
              </NavLink>
            </div>
            <div>
              <NavLink to={`/users/${user.id}/lists`} exact={true} activeClassName="active">
                Lists
              </NavLink>
            </div>
            <div>
              <NavLink to={`/users/${user.id}/trips`} exact={true} activeClassName="active">
                Trips
              </NavLink>
            </div>
            <div className="link_navlink">
              <NavLink to="/users" className="NavLink" exact={true} activeClassName="active">
                Users
              </NavLink>
            </div>
            <div>
              <NavLink to={`/users/${user.id}`} exact={true} activeClassName="active">
                My Stuff
              </NavLink>
            </div>
            <div className="link_navlink">
              <div className="NavLink" onClick={onLogout}>Logout</div>
            </div>
          </>
        }
        <div className="link_navlink">
          <NavLink to="/about" className="NavLink" exact={true} activeClassName="active">
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;