import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMealContext } from '../../contexts/MealContext';
import { ReactComponent as MealButton } from '../../assets/svg/ellipse_10.svg';
import { ReactComponent as PlusInCircle } from '../../assets/svg/close_big2.svg';
import { ReactComponent as ButtonContainer } from '../../assets/svg/ellipse_152.svg';
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
          <MealButton />
        </div>
        <div className={`${styles.mealName}`}>{meal}</div>
      </div>
    ))}
  </div>
);

export const Footer = ({ first = false }) => {
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
          <ButtonContainer />
        </span>
        <span className={`${styles.plusSign} ${active ? styles.active : ''}`}>
          <PlusInCircle />
        </span>
      </span>
    );
  };

  return (
    <>
      <div id="main-nav-bar" className={`${styles.mainNavBar} ${active ? styles.active : ''}`}>
        <div className={`${styles.navAddButtonContainer} ${first ? styles.first : ''}`}>
          {AddButton()}
        </div>
        <div className={`${styles.addItemsWrapper} ${first ? styles.first : ''}`}>
          <AddMealButtons meals={meals} active={active} onMealSelect={onMealSelect} />
        </div>
      </div>
    </>
  );
};
