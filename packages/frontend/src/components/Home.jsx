import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <div>
        <NavLink to="/login">Log In</NavLink>
      </div>
      <div>
        <NavLink to="/register">Register a new account</NavLink>
      </div>
      <div>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
      <div>
        <NavLink to="/addmeal">Add a meal</NavLink>
      </div>
    </div>
  );
}

export default Home;
