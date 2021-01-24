import styled from 'styled-components';

const renderBackgroundColor = (variant) => {
  switch (variant) {
    default:
    case 'black':
      return '#979797';
    case 'lightGrey':
      return '#E5E5E5';
  }
};

export const Divider = styled.hr`
  background-color: ${({ variant }) => renderBackgroundColor(variant)};
  border: none;
  height: 1px;
  width: 100%;
`;
