import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Login() {
    const { login, loginWithGoogle } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    async function loginGoogle() {
        try{
            await loginWithGoogle();
            console.log('google sign in')
        }catch(e){
            console.log(e);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(form.email, form.password)
            console.log('done')
        } catch (e) {
            console.log(e)
        }
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
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
            <form onSubmit={handleSubmit}>
                <input type='text' name="email" placeholder='email' onChange={handleChange} />
                <input type='text' name="password" placeholder='password' onChange={handleChange} />
                <button type='submit'>submit</button>
            </form>
            <div onClick={loginGoogle}>click here to login with google</div>
            <div><NavLink to="/">Back Home</NavLink></div>

        </div>
    )
}

export default Login
