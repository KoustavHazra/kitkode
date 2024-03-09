import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./Admin-Contacts.css";

const AdminContacts = () => {
    const [ contacts, setContacts ] = useState([]);
    const { authorizationToken } = useAuth();
    const URL_CONTACTDATA = "http://localhost:3000/api/admin/contacts";

    const getAllContactData = async () => {
        try {
            const response = await fetch(URL_CONTACTDATA, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const responseData = await response.json();
            setContacts(responseData);
            // console.log(`Users data from db: ${responseData}`);
        } catch (error) {
            console.log(`Error while fetching the contact data from db: ${error}`);
        }
    }
    useEffect(() => {
        getAllContactData();
    }, []);

    const deleteContact = async (id) => {
        const URL_DELETE_CONTACT = `http://localhost:3000/api/admin/contacts/delete/${id}`;
        try {
            const response = await fetch(URL_DELETE_CONTACT, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            });
    
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Contact message not found");
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            // Update the users state to remove the deleted user
            setContacts(contacts.filter(contact => contact._id !== id));
            const responseData = await response.json();
            console.log(`user deleted: ${responseData}`);
            
        } catch (error) {
            console.log(`Error while deleting the message: ${error}`);
        }
    };

    if (contacts === null) {
        return <h1>Loading...</h1>;
    };

    return <>
    <section className="admin-users-section">
        
        <div className="container">
            <h1>Admin users data</h1>
        </div>
        
        <div className="container admin-users">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((currentContact, index) => {
                        return <tr key={index}>
                            <td>{currentContact.username}</td>
                            <td>{currentContact.email}</td>
                            <td>{currentContact.message}</td>
                            <td>
                                <button onClick={() => deleteContact(currentContact._id)}>
                                    <div className="delete-button">Delete</div>
                                </button>
                            </td>
                        </tr>
                    })};
                </tbody>
            </table>
            
        </div>

    </section>
    
</>;
}

export default AdminContacts;