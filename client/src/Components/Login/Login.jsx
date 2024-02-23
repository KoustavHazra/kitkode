import React, { useState } from 'react';
import "./Login.css"

const Login = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  return (
    <div id="login" className='flex-col'>
      <h1>Login</h1>
      <div className='signup-form'>

        <div className='subform'>
          <label htmlFor="email">Email: </label>
          <input 
                onChange={(e) => setEmail(e.target.value)} 
                type="text" name='email' placeholder='Your Email' />
        </div>
            
        <div className='subform'>
          <label htmlFor="password">Password: </label>
          <input 
                onChange={(e) => setPassword(e.target.value)} 
                type="text" name='password' placeholder='Your Password' />
        </div>

        <button
          type='submit'
          id='test'
          onClick={async (e) => {
            const response = await fetch("http://localhost:3000/login", {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password
              }),
            });

            const json = await response.json();
            localStorage.setItem("token", json.token);
          }}>
          LOGIN
        </button>

      </div>
    </div>
  )
}

export default Login ;