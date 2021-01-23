/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { ReactComponent as ClimateDietLogo } from '../../assets/svg/climate_diet_logo.svg';
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

  const LandingPageHeader = styled.div`
    width: 33px;
    height: 93px;
    padding: 34px 0 0;
  `;

  const LandingPage = styled.div`
    color: #fff;
    padding-top: 184px;

    > div {
      width: 100%;
    }
  `;

  const Button = styled.div`
    width: 242px;
    height: 57px;
    background: #fac138;
    box-sizing: border-box;
    border-radius: 29.5px;
    color: #005a36;
    font-weight: 500;
    font-size: 20px;
    line-height: 125.2%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  `;

  return (
    <>
      <LandingPageHeader>
        <ClimateDietLogo />
      </LandingPageHeader>
      <LandingPage>
        <div className={`${styles.welcomeHeading} ${styles.heading}`}>
          <div>Welcome to</div>
          <div className={styles.darkGreenText}>Climate Diet SG</div>
        </div>
        <div className={styles.welcomeMsg}>
          Begin your first step towards sustainable eating here with us!
        </div>
        <NavLink to="/register">
          <Button>Register</Button>
        </NavLink>
        <div className={styles.signIn}>
          Already have an account? Sign in{' ' /* Please help update lint rules to allow space */}
          <NavLink className={styles.signInLink} to="/login">
            here
          </NavLink>
        </div>
        <div>======================================</div>
        <div>TODO: Remove content below in future</div>
        <div>======================================</div>
        <div>
          <NavLink to="/dashboard/">Dashboard</NavLink>
        </div>

        <h4>Current User</h4>
        <div>{currUser ? currUser.email : 'NO ONE LOGGED IN'}</div>
        <div tabIndex="0" role="button" onClick={handleLogout}>
          Logout
        </div>
      </LandingPage>
    </>
  );
};
