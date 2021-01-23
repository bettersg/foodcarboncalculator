import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

export const Register = () => {
  const { signup } = useAuth();
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [existingCredentialError, setExistingCredentialError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.email, form.password);
      history.push('/app');
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        setExistingCredentialError(true);
      }
    }
  };

  const RegisterPage = styled.div`
    width: 100%;
    color: #ffffff;
    padding-top: 184px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const PageWrapper = styled.div`
    width: 40vw;
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
    padding-bottom: 20px;
    > a:hover {
      text-decoration: underline;
    }
  `;

  const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const Input = styled.input`
    width: 100%;
    height: 30px;
    margin: 0 0 10px;
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <RegisterPage>
      <PageWrapper>
        <PageHeading>Register a new account</PageHeading>
        {existingCredentialError && <div>This email already exists.</div>}
        <BackLinkWrapper>
          <NavLink to="/">&lsaquo; Back Home</NavLink>
        </BackLinkWrapper>
        <Form onSubmit={handleSubmit}>
          <Input type="text" name="email" placeholder="email" onChange={handleChange} />
          <Input type="text" name="password" placeholder="password" onChange={handleChange} />
          <Button type="submit">submit</Button>
        </Form>
      </PageWrapper>
    </RegisterPage>
  );
};
