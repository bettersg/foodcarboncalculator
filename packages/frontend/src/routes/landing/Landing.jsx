import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BigYellowButton } from '../../components/big-yellow-button/BigYellowButton';
import styled from 'styled-components';
import styles from '../../styles/Landing.module.css';

const LandingPage = styled.div`
  color: white;
  padding-top: 99px;
`;

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

  /* TO DO : import Redirect from react-router and uncomment
  when the hamburger is functional */
  // if (false) {
  //   return <Redirect to="/dashboard" />;
  // }
  console.log(currUser);
  return (
    <>
      <LandingPage className="page-container">
        <div className={`${styles.welcomeHeading} ${styles.heading}`}>
          <div>Welcome to</div>
          <div className={styles.darkGreenText}>Climate Diet SG</div>
        </div>
        <div className={styles.welcomeMsg}>
          Begin your first step towards sustainable eating here with us!
        </div>
        <BigYellowButton text="Register" link="register" />
        <div className={styles.signIn}>
          Already have an account? Sign in{' ' /* Please help update lint rules to allow space */}
          <NavLink className={styles.signInLink} to="/login">
            here
          </NavLink>
        </div>
        <div className={`${styles.feet}`}>
          A product of better.sg, a non-profit techforgood organisation
        </div>
        <div id={`${styles.toremove}`}>
          <div>======================================</div>
          <div>TODO: Remove content below in future</div>
          <div>======================================</div>
          <div>
            <NavLink to="/dashboard/">Dashboard</NavLink>
          </div>
          <h4>Current User</h4>
          <div>{currUser ? currUser.email : 'NO ONE LOGGED IN'}</div>
          <div tabIndex="0" role="button" onClick={handleLogout} onKeyPress={() => {}}>
            Logout
          </div>
        </div>
      </LandingPage>
    </>
  );
};
