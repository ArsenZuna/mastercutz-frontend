import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from "../admin/utils/authStore.jsx";

const AdminRoute = ({ children }) => {
	const { admin } = useAuthStore();

	// If there is no admin or the admin is not an administrator, redirect (or display an error)
	if (!admin || admin.role !== 'admin') {
		// You can change this to redirect to a login or unauthorized page
		localStorage.clear();
		return <Navigate to="/admin" replace />;
	}

	// Otherwise, render the children component (protected route content)
	return children;
};

export default AdminRoute;