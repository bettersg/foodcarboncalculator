import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ReactComponent as ClimateDietLogo } from '../../assets/svg/climate_diet_logo.svg';
import { ReactComponent as HamburgerIcon } from '../../assets/svg/hamburger.svg';
import { ReactComponent as CloseMenuIcon } from '../../assets/svg/close_small.svg';
import styles from '../../styles/Header.module.css';
import { NavLink } from 'react-router-dom';

const menuItems = ['Database', 'Diary', 'Log Out', 'Notifcations', 'My account'];

const DropDownMenu = ({ menuItems, active, setActive }) => {
  return (
    <div
      id="header-dropdown-menu"
      className={`${styles.headerDropdownMenu} ${active ? styles.active : ''}`}
    >
      <div
        tabIndex="0"
        role="button"
        id="close-menu-icon"
        className={styles.closeMenuIcon}
        onClick={() => setActive(!active)}
        onKeyDown={() => setActive(!active)}
      >
        <CloseMenuIcon />
      </div>
      {menuItems.map((item) => (
        <div role="menuitem" className={styles.headerDropdownMenuItem} key={item}>
          {item}
        </div>
      ))}
    </div>
  );
};

export const Header = () => {
  const [active, setActive] = useState(false);
  const { currUser } = useAuth();

  const hamburger = () => {
    return (
      <span
        id="hamburger-icon"
        tabIndex="0"
        role="menu"
        className={styles.hamburgerIcon}
        onClick={() => setActive(!active)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setActive(!active);
          }
        }}
      >
        <HamburgerIcon />
      </span>
    );
  };
  const Logo = (currUser) => {
    return (
      <span id="leaf-logo" className={styles.leafLogo}>
        <NavLink to={`/${currUser ? 'dashboard' : ''}`}>
          <ClimateDietLogo />
        </NavLink>
      </span>
    );
  };
  return (
    <>
      <div>
        <DropDownMenu menuItems={menuItems} active={active} setActive={setActive} />
        {Logo(currUser)}
        {currUser && hamburger()}
      </div>
    </>
  );
};
