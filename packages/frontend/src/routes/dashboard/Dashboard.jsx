import { NavLink } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div>
      <h1>USER DASHBOARD</h1>
      <h2>Welcome back ``name here``</h2>
      <div>
        <h4>Your carbon footprint last week is</h4>
        xxx
      </div>
      <div>
        <NavLink to="/addmeal">
          <h6>Add a meal</h6>
        </NavLink>
      </div>
    </div>
  );
};
