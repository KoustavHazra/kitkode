import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./Admin-Users.css";
import { Link } from "react-router-dom";

const AdminUsers = () => {
    console.log("users page in admin");
    const [ users, setUsers ] = useState([]);
    const { authorizationToken } = useAuth();
    console.log(`authorizationToken in admin users page ${authorizationToken}`);
    
    const URL_USERDATA = "http://localhost:3000/api/admin/users";
    
    const getAllUsersData = async () => {
        try {
            const response = await fetch(URL_USERDATA, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const responseData = await response.json();
            setUsers(responseData);
            console.log(`Users data from db: ${responseData}`);
        } catch (error) {
            console.log(`Error while fetching the users from db: ${error}`);
        }
    }
    useEffect(() => {
        getAllUsersData();
    }, []);

    const deleteUser = async (id) => {
        const URL_DELETE_USER = `http://localhost:3000/api/admin/users/delete/${id}`;
        try {
            const response = await fetch(URL_DELETE_USER, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            });
    
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("User not found");
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            
            // Update the users state to remove the deleted user
            setUsers(users.filter(user => user._id !== id));
            const responseData = await response.json();
            console.log(`user deleted: ${responseData}`);
            
        } catch (error) {
            console.log(`Error while deleting the user: ${error}`);
        }
    };

    if (users === null) {
        return <h1>Loading...</h1>;
    };
    console.log("users page 2 in admin");
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
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((currentUser, index) => {
                            return <tr key={index}>
                                <td>{currentUser.username}</td>
                                <td>{currentUser.email}</td>
                                <td>
                                    {/* <button onClick={() => updateUser(currentUser._id)}>
                                        <div className="update-button">Update</div>
                                    </button> */}
                                    <Link to={`/admin/users/${currentUser._id}/edit`}>Edit</Link>
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(currentUser._id)}>
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
};

export default AdminUsers;