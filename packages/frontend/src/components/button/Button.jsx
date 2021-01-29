import styled from 'styled-components';

// todo: add variants for different button styles
export const Button = styled.button`
  width: 100%;
  height: 58px;
  background: #fac138;
  border: none;
  border-radius: 29px;
  color: #005a36;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  :active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  :disabled {
    background: #979797;
    color: white;
  }
`;
