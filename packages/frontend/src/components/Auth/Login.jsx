/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const { login, loginWithGoogle, loginWithFacebook, currUser } = useAuth();
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [existingCredentialError, setExistingCredentialError] = useState(false);

  async function loginGoogle() {
    try {
      await loginWithGoogle();
      history.push('/app');
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/account-exists-with-different-credential') {
        setExistingCredentialError(true);
      }
    }
  }

  async function loginFaceBook() {
    try {
      setExistingCredentialError(false);
      await loginWithFacebook();
      history.push('/app');
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/account-exists-with-different-credential') {
        setExistingCredentialError(true);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setExistingCredentialError(false);
      await login(form.email, form.password);
      history.push('/app');
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/account-exists-with-different-credential') {
        setExistingCredentialError(true);
      }
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  if (currUser) {
    return <Redirect to="/app" />;
  }

  return (
    <div>
      <h1>Login</h1>
      {existingCredentialError && (
        <div>
          You have an account with a different sign-in method. Sign in to your account, then go to
          settings to link your accounts
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="email" onChange={handleChange} />
        <input type="text" name="password" placeholder="password" onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
      <div tabIndex="0" role="button" onClick={loginGoogle} onKeyDown={loginGoogle}>
        click here to login with google
      </div>
      <div tabIndex="0" role="button" onClick={loginFaceBook} onKeyDown={loginFaceBook}>
        click here to login with facebook
      </div>
      <div>
        <NavLink to="/">Back Home</NavLink>
      </div>
    </div>
  );
}

export default Login;
