import { useState, useEffect } from 'react';
import './Contact.css';
import { useAuth } from '../../store/auth';


const Contact = () => {
    const [ contact, setContact ] = useState({
        username: "",
        email: "",
        message: "",
      });
      
    const { user } = useAuth();
    
    console.log("contact data", contact);
    console.log("user data from auth", user);

    const [ userData, setUserData ] = useState(false);
    console.log("user data", userData);

    useEffect(() => {
        if (user && !userData) {
          setContact({
            username: user.username,
            email: user.email,
            message: "",
          });
          setUserData(true);
        }
      }, [ userData, user ]);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/form/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("message sent: ", responseData);

        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div id="contact" className='flex-col'>
        <section>
            <main>
            <div className="section-contact">
                <div className="container grid grid-two-cols">
                    
                    <div className="contact-image reg-img">
                            <img
                            src="../../../contact.png"
                            alt="contact form"
                            width="500"
                            height="500"
                            />
                    </div>

                    <div className='contact-form'>
                        <h1>Contact Us</h1>
                        <br />

                            <div className='subform-contact'>
                                <label htmlFor="username">Username </label>
                                <input 
                                    onChange={handleInput} 
                                    type="name" name='username' placeholder='Your username'
                                    autoCapitalize='off' required value={contact.username} />
                            </div>

                            <div className='subform-contact'>
                                <label htmlFor="email">Email </label>
                                <input 
                                    onChange={handleInput} 
                                    type="email" name='email' placeholder='Your email'
                                    autoCapitalize='off' required value={contact.email} />
                            </div>
                                
                            <div className='subform-contact'>
                                <label htmlFor="message">Message </label>
                                <textarea
                                    onChange={handleInput} 
                                    name='message' 
                                    placeholder='Write something...' 
                                    rows={5} // Set the initial number of rows
                                    autoComplete='off' required
                                />
                            </div>
                            <br />
                            <button type='submit' id='test' onClick={handleSubmit}>
                                Send message
                            </button>

                    </div>

                </div>
            </div>
            </main>
        </section>
        </div>
    )
};

export default Contact;