import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import Footer from '../footer';
import { ReactComponent as Bubble } from '../../assets/svg/speech_bubble.svg';

const Welcome = styled.div`
  color: white;
  margin-top: 109px;

  > h2 {
    font-weight: bold;
    font-size: 32px;
    line-height: 37px;
  }

  > div {
    margin: 16px 0;
    font-size: 18px;
    line-height: 125.2%;
  }
`;

const ClickToAdd = styled.div`
  margin-top: 161px;
  font-size: 16px;
  line-height: 125.2%;
  text-align: center;
  color: #005a36;
  position: relative;
  
  > div {
    width: 100%;
    position: absolute;
    top: 23%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const FirstMeal = () => {
  const { currUser } = useAuth();
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Home</h1>
      </div>
      <Welcome>
        <h2>
          Welcome, <span>{currUser.providerData[0].displayName}</span>
        </h2>
        <div>
          Great job in taking the first step!
          <br />
          Add your first meal to your food diary.
        </div>
      </Welcome>
      <ClickToAdd>
        <Bubble />
        <div>Click &ldquo;+&ldquo; to add your first meal</div>
      </ClickToAdd>
      <Footer first={true} />
    </div>
  );
};
