/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Landing() {
  const { logout, currUser } = useAuth();

  async function handleLogout() {
    if (currUser) {
      try {
        await logout();
        console.log('logged out');
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div>
      <h1>Home Page</h1>

      <div>
        <NavLink to="/login">Log In</NavLink>
      </div>
      <div>
        <NavLink to="/register">Register a new account</NavLink>
      </div>
      <div>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
      <div>
        <NavLink to="/addmeal">Add a meal</NavLink>
      </div>

      <h4>Current User</h4>
      <div>{currUser ? currUser.email : 'NO ONE LOGGED IN'}</div>
      <div tabIndex="0" role="button" onClick={handleLogout} onKeyDown={handleLogout}>
        Logout
      </div>
    </div>
  );
}

export default Landing;
