import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ButtonWrapper = styled.div`
  width: fit-content;
`;

const Button = styled.button`
  width: 242px;
  height: 57px;
  background: #fac138;
  box-sizing: border-box;
  border: none;
  border-radius: 29.5px;
  color: #005a36;
  font-weight: 500;
  font-size: 20px;
  line-height: 125.2%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;

  :active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  :disabled {
    background: #979797;
    color: white;
  }
`;

export const BigYellowButton = ({ text, link, samePage = false, disabled = false, click }) => {
  return (
    <ButtonWrapper>
      {samePage ? (
        <Button disabled={disabled} type="button" onClick={click}>
          {text}
        </Button>
      ) : (
        <NavLink to={`/${link}`}>
          <Button>{text}</Button>
        </NavLink>
      )}
    </ButtonWrapper>
  );
};
