import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Register() {
    const { signup } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            await signup(form.email, form.password)
            console.log('done')
        }catch(e){
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
            <h1>Register</h1>

            <div><NavLink to="/">Back Home</NavLink></div>
            <form onSubmit={handleSubmit}>
                <input type='text' name="email" placeholder='email' onChange={handleChange} />
                <input type='text' name="password" placeholder='password' onChange={handleChange} />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default Register
