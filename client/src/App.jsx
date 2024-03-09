import { BrowserRouter , Routes , Route } from "react-router-dom";

import HomePage from "./Components/HomePage/HomePage"
import AllProblems from "./Components/AllProblems/AllProblems";

import Navbar from "./Constants/Navbar/Navbar"
import ProblemsPage from "./Components/ProblemsPage/ProblemsPage";
import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login"
import Contact from "./Components/Contact/Contact";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Logout from "./Components/Logout/Logout";
import Footer from "./Constants/Navbar/Footer";
import AdminLayout from "./Components/Admin/Admin";
import AdminUsers from "./Components/Admin/Admin-Users";
import AdminContacts from "./Components/Admin/Admin-Contacts";
import AdminUpdate from "./Components/Admin/Admin-Update";
import "./App.css";


function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/problemset/all/" element={<AllProblems />} />
                <Route path="/problems/:pid/" element={<ProblemsPage  />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="contacts" element={<AdminContacts />} />
                    <Route path="users/:id/edit" element={<AdminUpdate />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>

  )
}

export default App