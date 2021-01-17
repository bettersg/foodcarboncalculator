import { useState } from 'react';
import { ReactComponent as LeafLogo } from '../../assets/svg/leaf_logo.svg';
import { ReactComponent as HamburgerIcon } from '../../assets/svg/hamburger.svg';
import { ReactComponent as CloseMenuIcon } from '../../assets/svg/close_small.svg';
import styles from '../../styles/Header.module.css';
import { menuItems } from './Mocks';

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
  return (
    <>
      <div className={styles.header}>
        <DropDownMenu menuItems={menuItems} active={active} setActive={setActive} />
        <div className={styles.headerIcons}>
          <span id="leaf-logo" className={styles.leafLogo}>
            <LeafLogo />
          </span>
          <span
            id="hamburger-icon"
            tabIndex="0"
            role="menu"
            className={styles.hamburgerIcon}
            onClick={() => setActive(!active)}
            onKeyDown={() => setActive(!active)}
          >
            <HamburgerIcon />
          </span>
        </div>
      </div>
    </>
  );
};
