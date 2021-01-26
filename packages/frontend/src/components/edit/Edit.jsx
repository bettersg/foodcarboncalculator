import { ReactComponent as EditIcon } from '../../assets/svg/edit.svg';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: max-content;
  margin: 0 49px 0 auto;
  color: #16b187;
`;

const Text = styled.span`
  position: absolute;
  top: 2px;
  text-decoration: underline;
  text-underline-offset: 6px;
  font-size: 16px;
  padding-left: 2px;
`;

export const Edit = () => {
  return (
    <Container>
      <EditIcon />
      <Text>Edit</Text>
    </Container>
  );
};
