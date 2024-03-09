import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // let handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("after login from frontend: ", responseData);
        setUser({ email: "", password: "" });
        saveToken(responseData.token);
        toast.success("Login successful!");
        navigate('/');

      } else {
          console.log("Invalid credentials. Please put the proper email id and password.")
          toast.error("Invalid credentials.");
      }

    } catch (error) {
      console.log("Error while logging in user", error);
      toast.error("There's something wrong, please contact the admins.")
    }
  };


  return (
    <div id="login" className='flex-col'>
      <section>
        <main>
          <div className="section-login">
              <div className="container grid grid-two-cols">
                
                <div className="login-image reg-img">
                        <img
                        src="../../../register.png"
                        alt="login form"
                        width="500"
                        height="500"
                        />
                  </div>

                <div className='login-form'>
                  <h1>Login Form</h1>
                  <br />

                    <div className='subform-login'>
                      <label htmlFor="email">Email </label>
                      <input 
                            onChange={handleInput}
                            type="text" name='email' placeholder='Your Email' />
                    </div>
                        
                    <div className='subform'>
                      <label htmlFor="password">Password </label>
                      <input 
                            onChange={handleInput}
                            type="password" name='password' placeholder='Your Password' />
                    </div>
                    <br />
                    <button type='submit' id='test' onClick={handleSubmit}>
                      Login
                    </button>

                </div>

            </div>
          </div>
        </main>
      </section>
    </div>
  )
}

export default Login;