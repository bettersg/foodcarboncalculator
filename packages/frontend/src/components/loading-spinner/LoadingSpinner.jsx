import styled from 'styled-components';

const Loading = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export const LoadingSpinner = () => {
  return (
    <Loading>
      <img src="https://i.gifer.com/2FYF.gif" alt="loading..." />
    </Loading>
  );
};
