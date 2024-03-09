import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';

const Signup = () => {

  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("response after signup from frontend", responseData);
        setUser({ username: "", email: "", password: "" });
        saveToken(responseData.token);
        toast.success("registration successful");
        navigate('/');
      } else {
          console.log("Invalid credentials. Please put the proper username, email id and password.")
          toast.error("Invalid credentials.");

      }
    } catch (error) {
        console.log("Error while signing in user", error);
        toast.error("There's something wrong, please contact the admins.")
    }
  };

  return (
    <div id="signup" className='flex-col'>
      <section>
        <main>
          <div className="section-signup">
              <div className="container grid grid-two-cols">
                
                <div className="signup-image reg-img">
                      <img
                      src="../../../register.png"
                      alt="signup form"
                      width="500"
                      height="500"
                      />
                </div>

                <div className='signup-form'>
                  <h1>Registration Form</h1>
                  <br />
                  
                  <div className='subform'>
                    <label htmlFor="username">Username </label>  
                    <input 
                          onChange={handleInput} 
                          type="text" name='username' placeholder='Your username' />
                  </div>

                  <div className='subform'>
                    <label htmlFor="email">Email </label>
                    <input 
                          onChange={handleInput} 
                          type="text" name='email' placeholder='Your email' />
                  </div>
                  
                  <div className='subform'>
                    <label htmlFor="password">Password </label>
                    <input 
                          onChange={handleInput} 
                          type="text" name='password' placeholder='Your password' />
                  </div>
                  <br />

                  <button type='submit' id='test' onClick={handleSubmit}>
                    Register Now
                  </button>

              </div>

            </div>
          </div>
        </main>
      </section>
    </div>
  )
}

export default Signup;