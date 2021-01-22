/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/Landing.module.css';

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

  console.log(currUser);
  return (
    <div className={styles.landingPage}>
      <div className={`${styles.welcomeHeading} ${styles.heading}`}>
        <div>Welcome to</div>
        <div className={styles.darkGreenText}>Climate Diet SG</div>
      </div>
      <div className={styles.welcomeMsg}>
        Begin your first step towards sustainable eating here with us!
      </div>
      <div className={styles.buttonWrapper}>
        <NavLink to="/register">
          <div className={styles.registerButton}>Register</div>
        </NavLink>
      </div>
      <div className={styles.signIn}>
        Already have an account? Sign in{' ' /* Please help update lint rules to allow space */}
        <NavLink className={styles.signInLink} to="/login">
          here
        </NavLink>
      </div>
      <div>======================================</div>
      <div>TODO: Remove content below when possible</div>
      <div>======================================</div>
      <div>
        <NavLink to="/dashboard/">Dashboard</NavLink>
      </div>

      <h4>Current User</h4>
      <div>{currUser ? currUser.email : 'NO ONE LOGGED IN'}</div>
      <div tabIndex="0" role="button" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};
