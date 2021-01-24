import styled from 'styled-components';

export const Divider = styled.hr`
  background-color: ${({ variant }) => {
    switch (variant) {
      default:
      case 'black':
        return '#979797';
      case 'lightGrey':
        return '#E5E5E5';
    }
  }};
  border: none;
  height: 1px;
  width: 100%;
`;
