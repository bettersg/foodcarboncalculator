import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as PlusInCircle } from '../../assets/svg/close_big.svg';
import { ReactComponent as AddCircleLogo } from '../../assets/svg/ellipse_15.svg';
import { useMealContext } from '../../contexts/MealContext';
import AddMealButtons from './AddMealButtons';
import styles from '../../styles/Footer.module.css';

export const NavBarWrapper = () => {
  const [active, setActive] = useState(false);
  const history = useHistory();
  const { meals } = useMealContext();

  const onMealSelect = (meal) => {
    setActive(false);
    history.push(`/log-meal/${meal}`);
  };

  const AddButton = () => {
    return (
      <span
        className={`${styles.addButton}`}
        tabIndex="0"
        role="button"
        onClick={() => setActive(!active)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setActive(!active);
          }
        }}
      >
        <span>
          <AddCircleLogo />
        </span>
        <span className={`${styles.plusSign}`}>
          <PlusInCircle />
        </span>
      </span>
    );
  };

  return (
    <>
      <div id="main-nav-bar" className={`${styles.mainNavBar}`}>
        <div className={`${styles.addItemsWrapper}`}>
          <AddMealButtons
            meals={meals}
            active={active}
            styles={styles}
            onMealSelect={onMealSelect}
          />
        </div>
        <div className={`${styles.navAddButtonContainer}`}>{AddButton()}</div>
      </div>
    </>
  );
};
