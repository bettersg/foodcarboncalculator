import { NavLink } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
import { BigYellowButton } from '../../components/big-yellow-button/BigYellowButton';
import styled from 'styled-components';
import styles from '../../styles/Landing.module.css';

const LandingPage = styled.div`
  color: white;
  padding-top: 99px;
`;

export const Landing = () => {
  // const { logout, currUser } = useAuth();

  /* TO DO : import Redirect from react-router and uncomment
  when the hamburger is functional */
  // if (false) {
  //   return <Redirect to="/dashboard" />;
  // }
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
      </LandingPage>
    </>
  );
};
