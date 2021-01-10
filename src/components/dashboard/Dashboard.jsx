import React from 'react'
import { NavLink } from 'react-router-dom'

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome back ``name here``</h2>
            <div>
                <h4>Your carbon footprint last week is</h4>
                xxx
            </div>
            <div>
                <NavLink to="/addmeal"><h6>Add a meal</h6></NavLink>
            </div>
        </div>
    )
}

export default Dashboard
