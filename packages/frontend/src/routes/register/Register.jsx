import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FirstMeal } from '../../components/first-meal/FirstMeal';
import { InputBar } from '../../components/input-bar';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage = styled.div`
  margin-top: 184px;
  color: #fff;
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
  > Input {
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

export const Register = () => {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [existingCredentialError, setExistingCredentialError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signup(form.email, form.password);
      setRegistered(true);
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        setExistingCredentialError(true);
      }
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      {registered ? (
        <FirstMeal />
      ) : (
        <RegisterPage className="page-container">
          <PageWrapper>
            <PageHeading>Register a new account</PageHeading>
            {existingCredentialError && <div>This email already exists.</div>}
            <BackLinkWrapper>
              <NavLink to="/">&lsaquo; Back Home</NavLink>
            </BackLinkWrapper>
            <Form onSubmit={handleSubmit}>
              <InputBar placeholder="name" type="text" changeHandler={handleChange} />
              <InputBar placeholder="email" type="text" changeHandler={handleChange} />
              <InputBar placeholder="password" type="password" changeHandler={handleChange} />
              <InputBar
                placeholder="confirm password"
                type="password2"
                changeHandler={handleChange}
              />
              <Button type="submit" disabled={submitting}>
                submit
              </Button>
            </Form>
          </PageWrapper>
        </RegisterPage>
      )}
    </>
  );
};
