import React from 'react'
import { NavLink } from 'react-router-dom'

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <div>
                <h3>Implement Log In System</h3>
                <div>
                    Integrate firebaseAuth
                </div>
                <div>
                    firebase config : src/common/firebaseConfig
                </div>
            </div>
            <div><NavLink to="/">Back Home</NavLink></div>

        </div>
    )
}

export default Login
