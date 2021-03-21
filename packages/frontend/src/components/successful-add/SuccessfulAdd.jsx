import styled from 'styled-components';
import { ReactComponent as Tick } from '../../assets/svg/circle_check_outline.svg';

const Container = styled.div`
  background-color: #e6e7eb;
  position: absolute;
  border-radius: 10px;
  width: 86%;
  color: #005a36;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
`;

const Item = styled.div`
  margin: 13px;
  text-align: center;
`;

export const SuccessfulAdd = ({ meal }) => {
  return (
    <Container>
      <div>
        <Item>
          <Tick />
        </Item>
        <Item>Food successfully added to {meal}</Item>
      </div>
    </Container>
  );
};
