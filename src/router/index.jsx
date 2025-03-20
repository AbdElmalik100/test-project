import { Navigate, Outlet, Route, Routes } from "react-router";
import Cookies from "js-cookie";
import Auth from "../layouts/Auth.jsx";
import Dashboard from "../layouts/Dashboard.jsx";
import Home from "../pages/Home.jsx";
import ResetPassword from "../pages/Auth/ResetPassword.jsx";
import Login from "../pages/Auth/Login.jsx";
import SetPassword from "../pages/Auth/SetPassword.jsx";
import SetOtp from "../pages/Auth/SetOtp.jsx";
import Employees from "../pages/Employees/Employees.jsx";
import EmployeesDetails from "../pages/Employees/EmployeesDetails.jsx";
import EmployeesAdd from "../pages/Employees/EmployeesAdd.jsx";
import Supervisors from "../pages/Supervisors/Supervisors.jsx";
import SupervisorsAdd from "../pages/Supervisors/SupervisorsAdd.jsx";
import Tasks from "../pages/Tasks/Tasks.jsx";
import TasksAdd from "../pages/Tasks/TasksAdd.jsx";
import Projects from "../pages/Projects/projects.jsx";
import ProjectsAdd from "../pages/Projects/ProjectsAdd.jsx";
import SupervisorsDetails from "../pages/Supervisors/SupervisorsDetails.jsx";
import Reports from "../pages/Reports.jsx";
import ProjectsDetails from "../pages/Projects/ProjectsDetails.jsx";
import Settings from "../pages/Settings.jsx";
import Permissions from "../pages/Permissions.jsx";
import TasksDetails from "../pages/Tasks/TasksDetails.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Error from "../error.jsx";
import { hasPermission } from "../utils/index.js";

const AppRouter = () => {
    const AuthGuard = () => {
        const isAuthenticated = Cookies.get("user_token");
        return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
    };

    const RequireAuth = () => {
        const isAuthenticated = Cookies.get("user_token");
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
    };


    const RequirePermission = ({ requiredPermissions }) => {
        const { user } = useSelector((state) => state.users);
        if (user) {
            return hasPermission(user, requiredPermissions) ? <Outlet /> : <Navigate to="/unauthorized" replace state={{error: 401}} />;
        }
    }


    return (
        <Routes>
            <Route element={<RequireAuth />} >
                <Route path="/" element={<Dashboard />} >
                    <Route index element={<Home />} />
                    <Route element={<RequirePermission requiredPermissions={['عرض المشاريع']} />}>
                        <Route path='/projects-list' element={<Projects />} />
                        <Route path='/projects-list/:id' element={<ProjectsDetails />} />
                    </Route>
                    <Route element={<RequirePermission requiredPermissions={['إنشاء مشروع']} />}>
                        <Route path='/projects-add' element={<ProjectsAdd />} />
                    </Route>
                    <Route element={<RequirePermission requiredPermissions={['عرض المهام']} />}>
                        <Route path='/tasks-list' element={<Tasks />} />
                        <Route path='/tasks-list/:id' element={<TasksDetails />} />
                    </Route>
                    <Route element={<RequirePermission requiredPermissions={['إنشاء مهمة']} />}>
                        <Route path='/tasks-add' element={<TasksAdd />} />
                    </Route>
                    <Route element={<RequirePermission requiredPermissions={['عرض الموظفين']} />}>
                        <Route path='/employees-list' element={<Employees />} />
                        <Route path='/employees-list/:id' element={<EmployeesDetails />} />
                    </Route>
                    <Route element={<RequirePermission requiredPermissions={['إنشاء موظف']} />}>
                        <Route path='/employees-add' element={<EmployeesAdd />} />
                    </Route>
                    <Route element={<RequirePermission requiredPermissions={['عرض المقاولين']} />}>
                        <Route path='/supervisors-list' element={<Supervisors />} />
                        <Route path='/supervisors-list/:id' element={<SupervisorsDetails />} />
                    </Route>
                    <Route element={<RequirePermission requiredPermissions={['إنشاء مقاول']} />}>
                        <Route path='/supervisors-add' element={<SupervisorsAdd />} />
                    </Route>
                    <Route element={<RequirePermission requiredPermissions={['عرض التقارير']} />}>
                        <Route path='/reports' element={<Reports />} />
                    </Route>
                    <Route element={<RequirePermission requiredPermissions={['عرض الأدوار']} />}>
                        <Route path='/permissions' element={<Permissions />} />
                    </Route>
                    <Route path='/settings' element={<Settings />} />
                </Route>
            </Route>
            <Route element={<AuthGuard />}>
                <Route element={<Auth />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/set-password" element={<SetPassword />} />
                    <Route path="/set-otp" element={<SetOtp />} />
                </Route>
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default AppRouter;

// ------------------------------------------
// This Approach Using createBrowserRouter Function & <RouterProvider /> Component From React-Router Library ♥♥♥ REMEBER IT
// DON'T FORGET TO REMOVE <BrowserRouter /> Component From Main.jsx
// ------------------------------------------

// import { createBrowserRouter, RouterProvider } from 'react-router'
// const AppRouter = () => {
//     const AuthGuard = () => {
//         const isAuthenticated = Cookies.get("user_token");
//         return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
//     };

//     const RequireAuth = () => {
//         const isAuthenticated = Cookies.get("user_token");
//         return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
//     };

//     const routes = createBrowserRouter([
//         {
//             element: <RequireAuth />,
//             children: [
//                 {
//                     path: "/",
//                     element: <Dashboard />,
//                     children: [
//                         { index: true, element: <Home /> },
//                         { path: "projects-list", element: <Projects /> },
//                         { path: "projects-add", element: <ProjectsAdd /> },
//                         { path: "tasks-list", element: <Tasks /> },
//                         { path: "tasks-add", element: <TasksAdd /> },
//                         { path: "employees-list", element: <Employees /> },
//                         { path: "employees-add", element: <EmployeesAdd /> },
//                         { path: "supervisors-list", element: <Supervisors /> },
//                         { path: "supervisors-add", element: <SupervisorsAdd /> },
//                     ],
//                 },
//             ],
//         },
//         {
//             element: <AuthGuard />,
//             children: [
//                 {
//                     // path: "/",
//                     element: <Auth />,
//                     children: [
//                         { path: "login", element: <Login /> },
//                         { path: "reset-password", element: <ResetPassword /> },
//                         { path: "set-password", element: <SetPassword /> },
//                         { path: "set-otp", element: <SetOtp /> },
//                     ],
//                 },
//             ],
//         },
//     ]);

//     return (
//         <RouterProvider router={routes} />
//     );
// };

// export default AppRouter;
