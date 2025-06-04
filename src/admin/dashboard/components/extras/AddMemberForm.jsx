import React, { useState } from "react";
import API from "../../../../api/api.jsx";
import { motion } from "framer-motion";
import useAuthStore from "../../../utils/authStore.jsx";

const AddMemberForm = ({ onClose, onMemberAdded }) => {
	const admin = useAuthStore((state) => state.admin);
	const [formData, setFormData] = useState({
		name: "",
		role: "",
		phone: "",
		status: "",
		social: "",
		image: ""
	});

	const { name, role, phone, status, social } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const payload = { ...formData, shop: admin.id };
			const response = await API.post("/api/staff", payload);
			if (onMemberAdded) onMemberAdded(response.data);
			onClose();
		} catch (error) {
			console.error("Error: ", error.response?.data || error.message);
			alert("Something went wrong. Please wait and try again later!");
		}
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
				onClick={onClose}
			/>
			{/* Modal Container */}
			<div className="flex items-center justify-center min-h-screen p-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.2 }}
					className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
				>
					{/* Close Button */}
					<button
						onClick={onClose}
						className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none"
					>
						X
					</button>
					{/* Modal Header */}
					<div className="mb-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Add Staff Member
						</h3>
					</div>
					<form
						className="mt-4 mx-auto w-80 max-w-screen-lg lg:w-1/2"
						onSubmit={handleFormSubmit}
					>
						<div className="mb-2 flex flex-col gap-3">
							<label className="text-md text-gray-800 font-medium">Name</label>
							<input
								name="name"
								type="text"
								placeholder="Enter username here..."
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								value={name}
								onChange={handleChange}
							/>
							<label className="text-md text-gray-800 font-medium">Role</label>
							<input
								name="role"
								type="text"
								placeholder="Enter role here..."
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								value={role}
								onChange={handleChange}
							/>
							<label className="text-md text-gray-800 font-medium">
								Phone Number
							</label>
							<input
								name="phone"
								type="text"
								placeholder="+355 xxx"
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								value={phone}
								onChange={handleChange}
							/>
							<label className="text-md text-gray-800 font-medium">
								Social Link
							</label>
							<input
								name="social"
								type="social"
								placeholder="Enter social URL here..."
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								value={social}
								onChange={handleChange}
							/>
							<label className="text-md text-gray-800 font-medium">Shop</label>
							<input
								name="shop"
								type="text"
								placeholder={admin.name}
								disabled
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg bg-gray-100 focus:border-gray-900 focus:outline-none"
								value={admin.name}
							/>
							<label className="text-md text-gray-800 font-medium">Status</label>
							<select
								name="status"
								value={status}
								onChange={handleChange}
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
							>
								<option value="">Select status</option>
								<option value="true">Working</option>
								<option value="false">Day-off</option>
							</select>
						</div>
						<div className="flex justify-center items-center">
							<button
								type="submit"
								className="mt-8 w-80 bg-black text-white py-3 px-5 rounded-lg hover:bg-gray-800 transition-colors"
							>
								Add Staff Member
							</button>
						</div>
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default AddMemberForm;
