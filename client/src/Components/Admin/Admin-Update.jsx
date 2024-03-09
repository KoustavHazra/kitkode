import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const AdminUpdate = () => {
    
    const { authorizationToken } = useAuth();
    const  params = useParams();
    
    const [ userData, setUserData ] = useState({
        username: "",
        email: "",
      });

    const getUserData = async () => {
        const URL_GET_USER_DETAILS = `http://localhost:3000/api/admin/users/${params.id}`;
        try {
            const response = await fetch(URL_GET_USER_DETAILS, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
    
            if (!response.ok) {
                if (response.ok === 404) {
                    throw new Error("User not found");
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
    
            const responseData = await response.json();
            console.log(`user details found: ${responseData}`);
            setUserData(responseData);
        } catch (error) {
            console.log(`Error while getting user details: ${error}`);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL_UPDATE_USER_DETAILS = `http://localhost:3000/api/admin/users/update/${params.id}`;
        try {
            const response = await fetch(URL_UPDATE_USER_DETAILS, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                if (response.ok === 404) {
                    toast.error("User details were not updated.");
                    throw new Error("User details not updated.");
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
    
            const responseData = await response.json();
            console.log(`user details updated: ${responseData}`);
            toast.success("User details successfully updated.");

        } catch (error) {
            console.log(`Error while updating user details: ${error}`);
        }
    }

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
                        <h1>Update User Details</h1>
                        <br />

                            <div className='subform-contact'>
                                <label htmlFor="username">Username </label>
                                <input 
                                    onChange={handleInput} 
                                    type="name" name='username' placeholder='Your username'
                                    autoCapitalize='off' required value={userData.username} />
                            </div>

                            <div className='subform-contact'>
                                <label htmlFor="email">Email </label>
                                <input 
                                    onChange={handleInput} 
                                    type="email" name='email' placeholder='Your email'
                                    autoCapitalize='off' required value={userData.email} />
                            </div>
                                
                            <br />
                            <button type='submit' id='test' onClick={handleSubmit}>
                                Submit
                            </button>

                    </div>

                </div>
            </div>
            </main>
        </section>
        </div>
    )
};

export default AdminUpdate;