import { useMealContext } from '../../contexts/MealContext';
import styled from 'styled-components';
import styles from '../../styles/SearchResults.module.css';
import { NoSearchResults } from '../no-search-results';
import { ReactComponent as Heart } from '../../assets/svg/heart_outline.svg';
import { ReactComponent as Plus } from '../../assets/svg/plus_circle.svg';

const Meal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
`;
const Name = styled.div`
  font-size: 20px;
  line-height: 125.2%;
`;
const Portion = styled.div`
  font-size: 16px;
  line-height: 125.2%;
  color: #979797;
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Action = styled.div`
  margin-left: 20px;
`;

const validList = (list) => {
  if (list) {
    if (list.length) {
      return true;
    }
  }
  return false;
};

export const SearchResults = ({ meals, logDish = null, search = true }) => {
  const { favourites, toggleFavourite } = useMealContext();
  const isFavourite = (id) => {
    if (favourites.find((x) => x.id === id)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      {validList(meals) ? (
        meals.map((meal) => (
          <Meal key={meal.id || meal.name}>
            <div>
              <Name>{meal.name}</Name>
              <Portion>1 Portion</Portion>
            </div>
            {search && (
              <ActionContainer>
                <Action
                  role="button"
                  tabIndex="0"
                  className={`${isFavourite(meal.id) ? styles.favourite : ''}`}
                  onClick={() => toggleFavourite(meal)}
                  onKeyPress={() => {}}
                >
                  <Heart />
                </Action>
                <Action role="button" tabIndex="0" onClick={() => logDish(meal.id)}>
                  <Plus />
                </Action>
              </ActionContainer>
            )}
          </Meal>
        ))
      ) : (
        <NoSearchResults msg="No favourite dishes" />
      )}
    </div>
  );
};
