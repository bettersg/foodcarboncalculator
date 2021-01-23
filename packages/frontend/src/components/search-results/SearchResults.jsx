/* eslint-disable */
import styled from 'styled-components';
import styles from '../../styles/SearchResults.module.css';
import { ReactComponent as Heart } from '../../assets/svg/heart_outline.svg';
import { ReactComponent as Plus } from '../../assets/svg/plus_circle.svg';

const Meal = styled.div`
  display: flex;
  justify-content: space-between;
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

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
`;
const Button = styled.div`
    margin-left: 20px;
`;

export const SearchResults = ({ meals, favourites, toggleFavourite, logDish }) => {
    const isFavourite = (id) => {
        if (favourites.find(x => x.id === id)) {
            return true;
        } else { return false; };
    }

    return (
        <div>
            {meals.map(meal => (
                <Meal key={meal.id}>
                    <div>
                        <Name>{meal.name}</Name>
                        <Portion>1 Portion</Portion>
                    </div>
                    <ButtonContainer>
                        <Button role="button" tabIndex="0" className={`${isFavourite(meal.id) ? styles.favourite : ""}`} onClick={() => toggleFavourite(meal.id)} onKeyPress={() => {}}><Heart /></Button>
                        <Button role="button" tabIndex="0" onClick={() => logDish(meal.id)} ><Plus /></Button>
                    </ButtonContainer>
                </Meal>
            ))}
        </div>
    );
};
