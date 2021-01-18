import { NavLink } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="page-container">
      <div className="heading">
        <h1>USER DASHBOARD</h1>
      </div>
      <h2>Welcome back ``name here``</h2>
      <div>
        <h4>Your carbon footprint last week is</h4>
        xxx
      </div>
      <div>
        <NavLink to="/log-meal">
          <h6>Add a meal</h6>
        </NavLink>
      </div>
    </div>
  );
};
