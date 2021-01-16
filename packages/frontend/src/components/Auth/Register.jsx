import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Register() {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <h1>Register</h1>
      {existingCredentialError && <div>This email already exists.</div>}
      <div>
        <NavLink to="/">Back Home</NavLink>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="email" onChange={handleChange} />
        <input type="text" name="password" placeholder="password" onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Register;
