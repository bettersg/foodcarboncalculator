import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ButtonWrapper = styled.div`
  width: fit-content;
`;

const Button = styled.div`
  width: 242px;
  height: 57px;
  background: #fac138;
  box-sizing: border-box;
  border-radius: 29.5px;
  color: #005a36;
  font-weight: 500;
  font-size: 20px;
  line-height: 125.2%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BigYellowButton = ({ text, link, samePage = false }) => {
  return (
    <ButtonWrapper>
      {samePage ? (
        <Button>{text}</Button>
      ) : (
        <NavLink to={`/${link}`}>
          <Button>{text}</Button>
        </NavLink>
      )}
    </ButtonWrapper>
  );
};
