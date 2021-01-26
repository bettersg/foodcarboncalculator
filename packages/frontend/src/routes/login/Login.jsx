import { useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from '../../components/input';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = styled.div`
  color: #fff;
  margin-top: 184px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PageWrapper = styled.div`
  width: 80%;

  > div {
    width: 100%;
  }
`;

const PageHeading = styled.div`
  color: #005a36;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 28px;
  letter-spacing: 0.015em;
  text-transform: uppercase;
`;

const BackLinkWrapper = styled.div`
  width: fit-content;
  font-size: 16px;
  font-style: normal;
  line-height: 28px;

  > a:hover {
    text-decoration: underline;
  }
`;

const LoginOptions = styled.div`
  text-transform: capitalize;

  > div:hover {
    width: fit-content;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  > input {
    margin: 0 0 10px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background: #fac138;
  box-sizing: border-box;
  border: none;
  border-radius: 29.5px;
  color: #005a36;
  font-weight: 600;
  font-size: 20px;
  line-height: 125.2%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;

  :active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;

export const Login = () => {
  const { login, loginWithGoogle, loginWithFacebook, currUser } = useAuth();
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [existingCredentialError, setExistingCredentialError] = useState(false);

  const loginGoogle = async () => {
    // const a = 0.3 + 0.5;
    // console.log(a);
    try {
      await loginWithGoogle();
      history.push('/dashboard');
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/account-exists-with-different-credential') {
        setExistingCredentialError(true);
      }
    }
  };

  const loginFaceBook = async () => {
    try {
      setExistingCredentialError(false);
      await loginWithFacebook();
      history.push('/dashboard');
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/account-exists-with-different-credential') {
        setExistingCredentialError(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setExistingCredentialError(false);
      await login(form.email, form.password);
      history.push('/dashboard');
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/account-exists-with-different-credential') {
        setExistingCredentialError(true);
      }
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (currUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LoginPage className="page-container">
      <PageWrapper>
        <PageHeading>Login</PageHeading>
        {existingCredentialError && (
          <div>
            You have an account with a different sign-in method. Sign in to your account, then go to
            settings to link your accounts
          </div>
        )}
        <BackLinkWrapper>
          <NavLink to="/">&lsaquo; Back Home</NavLink>
        </BackLinkWrapper>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="email" type="text" onChange={handleChange} />
          <Input placeholder="password" type="text" onChange={handleChange} />
          <Button type="submit">submit</Button>
        </Form>
        <LoginOptions>
          <div tabIndex="0" role="button" onClick={loginGoogle} onKeyDown={loginGoogle}>
            click here to login with google
          </div>
          <div tabIndex="0" role="button" onClick={loginFaceBook} onKeyDown={loginFaceBook}>
            click here to login with facebook
          </div>
        </LoginOptions>
      </PageWrapper>
    </LoginPage>
  );
};
