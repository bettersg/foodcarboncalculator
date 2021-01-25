import { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FirstMeal } from '../../components/first-meal/FirstMeal';
import { InputBar } from '../../components/input-bar';
import { useAuth } from '../../contexts/AuthContext';
import { getData } from '../../common/axiosInstances';

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

const NoMatch = styled.div`
  color: red;
  font-size: 18px;
  height: 25px;
  width: 100%;
  text-align: left;
  margin-top: -5px;
`;

export const Register = () => {
  const { signup, currUser } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [existingCredentialError, setExistingCredentialError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  // const [showFirst, setShowFirst] = useState(false);
  const [pwNoMatch, setPwNoMatch] = useState(false);
  const [pwShort, setPwShort] = useState(false);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    if (!currUser) {
      setNewUser(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setPwShort(true);
    }
    if (form.password !== form.password2) {
      setPwNoMatch(true);
    } else {
      setSubmitting(true);
      try {
        let result = await signup(form.email, form.password);
        await createUserSettings(result.user.uid);
        await result.user.updateProfile({
          displayName: form.name,
        });
        setRegistered(true);
      } catch (e) {
        console.log(e);
        if (e.code === 'auth/email-already-in-use') {
          setExistingCredentialError(true);
        }
        setSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'password2') {
      setPwNoMatch(false);
    }
    if (e.target.name === 'password') {
      setPwShort(false);
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createUserSettings = async (id) => {
    try {
      await getData.get(`/user/?user=${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  if (!newUser && currUser) {
    return <Redirect to="/dashboard" />;
  }

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
              <InputBar placeholder="name" name="name" type="text" changeHandler={handleChange} />
              <InputBar placeholder="email" name="email" type="text" changeHandler={handleChange} />
              <InputBar
                placeholder="password"
                name="password"
                type="password"
                changeHandler={handleChange}
              />
              {pwShort && <NoMatch>Password min. 6 characters</NoMatch>}
              <InputBar
                placeholder="confirm password"
                type="password"
                name="password2"
                changeHandler={handleChange}
              />
              {pwNoMatch && <NoMatch>Passwords don&lsquo;t match</NoMatch>}
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
