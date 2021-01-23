import styled from 'styled-components';
import styles from '../../styles/SuccessfulAdd.module.css';
import { ReactComponent as Tick } from '../../assets/svg/circle_check_outline.svg';

const Container = styled.div`
  background-color: #e6e7eb;
  position: absolute;
  border-radius: 10px;
  width: 86%;
  height: 141px;
  color: #005a36;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-out;
  bottom: -141px;
`;

const Item = styled.div`
  margin: 13px;
  text-align: center;
`;

export const SuccessfulAdd = ({ meal, loggedMeal }) => {
  return (
    <Container className={`${loggedMeal ? styles.active : ''}`}>
      <div>
        <Item>
          <Tick />
        </Item>
        <Item>Food successfully added to {meal}</Item>
      </div>
    </Container>
  );
};
