/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Landing = () => {
  const { logout, currUser } = useAuth();

  const handleLogout = async () => {
    if (currUser) {
      try {
        await logout();
      } catch (e) {
        console.log(e);
      }
    }
  };

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
        -------------------------------------------------
        <br />
        only when logged in
        <br />
        -------------------------------------------------
        <br />
      </div>
      <div>
        <NavLink to="/app/">Dashboard</NavLink>
      </div>

      <h4>Current User</h4>
      <div>{currUser ? currUser.email : 'NO ONE LOGGED IN'}</div>
      <div tabIndex="0" role="button" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};
