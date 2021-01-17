import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as PlusInCircle } from '../../assets/svg/close_big.svg';
import { ReactComponent as AddCircleLogo } from '../../assets/svg/ellipse_15.svg';
import { useMealContext } from '../../contexts/MealContext';
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

export const NavBarWrapper = () => {
  const [active, setActive] = useState(false);
  const history = useHistory();
  const { meals } = useMealContext();

  const onMealSelect = (meal) => {
    setActive(false);
    history.push(`/log-meal/${meal}`);
  };

  return (
    <>
      <div id="main-nav-bar">
        <div id="add-items">
          <AddMealButtons meals={meals} active={active} onMealSelect={onMealSelect} />
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
