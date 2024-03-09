import { NavLink, Navigate, Outlet } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoIosContact } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import "./Admin.css";
import { useAuth } from '../../store/auth';

const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <h1>Loading ...</h1>
    }
    if (!user.isAdmin) {
        return <Navigate to="/" />
    };

    return <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/admin/users">
                                <CiUser /> Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contacts">
                                <IoIosContact />Contacts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                <FaHome />Home
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet />
    </>
}

export default AdminLayout;