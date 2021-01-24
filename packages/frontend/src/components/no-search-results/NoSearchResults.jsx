import styled from 'styled-components';

const Box = styled.div`
  color: #979797;
  text-align: center;
  font-size: 16px;
  line-height: 20vh;
  height: 20vh;
`;

export const NoSearchResults = ({ msg }) => {
  return <Box>{msg}</Box>;
};
