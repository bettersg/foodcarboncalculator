import { useState } from 'react';
import { ReactComponent as AddCircleLogo } from '../../../assets/svg/Ellipse 15.svg';
import { ReactComponent as PlusInCircle } from '../../../assets/svg/close_big.svg';
import AddMealButtons from './AddMealButtons';

const AddButton = () => {
  return (
    <span id="add-button">
      <span>
        <AddCircleLogo />
      </span>
      <span id="plus-sign">
        <PlusInCircle />
      </span>
    </span>
  );
};

const MainNavBar = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      <div id="main-nav-bar">
        <div id="add-items">
          <AddMealButtons active={active} setActive={setActive} />
        </div>
        <div
          tabIndex="0"
          role="button"
          id="main-nav-container"
          onClick={() => setActive(!active)}
          onKeyDown={() => setActive(!active)}
        >
          {AddButton()}
        </div>
      </div>
    </>
  );
};

export default MainNavBar;
