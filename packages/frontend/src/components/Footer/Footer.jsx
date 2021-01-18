import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMealContext } from '../../contexts/MealContext';
import { ReactComponent as MealContainer } from '../../assets/svg/ellipse_11.svg';
import { ReactComponent as PlusInCircle } from '../../assets/svg/close_big.svg';
import { ReactComponent as AddCircleLogo } from '../../assets/svg/ellipse_15.svg';
import styles from '../../styles/Footer.module.css';

const AddMealButtons = ({ meals, active, onMealSelect }) => (
  <div>
    {meals.map((meal) => (
      <div
        role="button"
        tabIndex={`${active ? 0 : -1}`}
        disabled={!active}
        className={`${styles.eachAddMealButton} ${active ? styles.active : ''}`}
        key={meal}
        onClick={() => onMealSelect(meal)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onMealSelect(meal);
          }
        }}
      >
        <div>
          <MealContainer />
        </div>
        <div>{meal}</div>
      </div>
    ))}
  </div>
);

export const Footer = () => {
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
          <AddMealButtons meals={meals} active={active} onMealSelect={onMealSelect} />
        </div>
        <div className={`${styles.navAddButtonContainer}`}>{AddButton()}</div>
      </div>
    </>
  );
};
