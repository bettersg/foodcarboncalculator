import { useState } from 'react';
import { ReactComponent as LeafLogo } from '../../assets/svg/leaf_logo.svg';
import { ReactComponent as HamburgerIcon } from '../../assets/svg/hamburger.svg';
import { ReactComponent as CloseMenuIcon } from '../../assets/svg/close_small.svg';
import '../../styles/header.css';
import { menuItems } from './Mocks';

const DropDownMenu = ({ menuItems, active, setActive }) => {
  return (
    <div id="header-dropdown-menu" className={`header-dropdown-menu ${active ? 'active' : ''}`}>
      <div
        tabIndex="0"
        role="button"
        id="close-menu-icon"
        className="close-menu-icon"
        onClick={() => setActive(!active)}
        onKeyDown={() => setActive(!active)}
      >
        <CloseMenuIcon />
      </div>
      {menuItems.map((item) => (
        <div role="menuitem" className={`header-dropdown-menu-item`} key={item}>
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
      <div className="header">
        <DropDownMenu menuItems={menuItems} active={active} setActive={setActive} />
        <div className="header-icons">
          <span id="leaf-logo" className="leaf-logo">
            <LeafLogo />
          </span>
          <span
            id="hamburger-icon"
            tabIndex="0"
            role="menu"
            className="hamburger-icon"
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
