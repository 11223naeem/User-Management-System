import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./components/auth/Login";
import Layout from "./components/Layout";

import AdminDashboard from "./components/pages/admin/AdminDashboard";
import Users from "./components/pages/admin/Users";
import Roles from "./components/pages/admin/Roles";

import ManagerDashboard from "./components/pages/manager/ManagerDashboard";
import ManagerTasks from "./components/pages/manager/ManagerTasks";

import UserDashboard from "./components/pages/user/UserDashboard";
import MyProfile from "./components/pages/user/MyProfile";
import MyTasks from "./components/pages/user/MyTasks";

import "./App.css";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* LOGIN */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* APPLICATION LAYOUT */}

                <Route element={<Layout />}>

                    {/* ADMIN */}

                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/users"
                        element={<Users />}
                    />

                    <Route
                        path="/admin/roles"
                        element={<Roles />}
                    />


                    {/* MANAGER */}

                    <Route
                        path="/manager"
                        element={<ManagerDashboard />}
                    />

                    <Route
                        path="/manager/tasks"
                        element={<ManagerTasks />}
                    />


                    {/* USER */}

                    <Route
                        path="/user"
                        element={<UserDashboard />}
                    />

                    <Route
                        path="/user/profile"
                        element={<MyProfile />}
                    />

                    <Route
                        path="/user/tasks"
                        element={<MyTasks />}
                    />

                </Route>


                {/* UNKNOWN PAGE */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;