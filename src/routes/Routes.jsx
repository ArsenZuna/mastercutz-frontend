import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from "../pages/Homepage.jsx";
import Admin from "../pages/Admin.jsx";
import Appointments from "../admin/pages/Appointments.jsx";
import Register from "../admin/auth/Register.jsx";
import Profile from "../admin/pages/Profile.jsx";
import StaffPanel from "../admin/pages/StaffPanel.jsx";
import AdminRoute from "./AdminRoute.jsx";
import Finances from "../admin/pages/Finances.jsx";

const Routes = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Homepage/>,
			errorElement: <h1>404 NOT FOUND</h1>
		},
		{
			path: '/admin',
			element: <Admin/>,
			errorElement: <h1>404 NOT FOUND</h1>
		},
		{
			path: '/admin/register',
			element: <Register/>,
			errorElement: <h1>404 NOT FOUND</h1>
		},
		{
			path: '/appointments',
			element: <Appointments/>,
			errorElement: <h1>404 NOT FOUND</h1>
		},
		{
			path: '/dashboard/profile',
			element: <Profile/>,
			errorElement: <h1>404 NOT FOUND</h1>
		},
		{
			path: '/dashboard/staff',
			element: (
				<AdminRoute>
					<StaffPanel/>
				</AdminRoute>
			),
			errorElement: <h1>404 NOT FOUND</h1>
		},
		{
			path: '/dashboard/finances',
			element: <Finances />,
			errorElement: <h1>404 NOT FOUND</h1>
		}
	]);

	return <RouterProvider router={router}/>;
};

export default Routes;