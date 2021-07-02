import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "../index.css"

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <div className="link_navlink">
          <NavLink to="/" className="NavLink" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div className="link_navlink">
          <NavLink to="/about" className="NavLink" exact={true} activeClassName="active">
            About
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
        <div className="link_navlink">
          <NavLink to="/users" className="NavLink" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div>
        <div className="link_navlink">
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;