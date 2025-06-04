import React, { useState } from 'react';
import useAuthStore from "../../../utils/authStore.jsx";
import API from "../../../../api/api.jsx";

const ChangePasswordModal = ({ onClose }) => {
	const admin = useAuthStore((state) => state.admin);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		// Validation
		if (!currentPassword || !newPassword || !confirmPassword) {
			setError('All fields are required');
			return;
		}

		if (currentPassword === newPassword) {
			setError('New password cannot be the same as the current password');
			return;
		}

		if (newPassword !== confirmPassword) {
			setError('New passwords do not match');
			return;
		}

		setLoading(true);

		try {
			const response = await API.post(
				'/api/auth/change-password',
				{ currentPassword, newPassword, confirmPassword }
			);

			setSuccess(response.data.message);
			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');

			setTimeout(() => {
				onClose();
			}, 1500);

		} catch (error) {
			setError(error.response?.data?.message || 'Failed to change password');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
			onClick={onClose}
		>
			<div
				className="bg-white p-8 rounded shadow-lg max-w-sm w-full relative"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
						{error}
					</div>
				)}

				{success && (
					<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
						{success}
					</div>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<label className="block text-lg font-semibold">Current Password</label>
						<input
							type="password"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							className="w-full p-2 border-2 border-gray-300 rounded"
							required
							autoFocus
						/>
					</div>

					<div>
						<label className="block text-lg font-semibold">New Password</label>
						<input
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="w-full p-2 border-2 border-gray-300 rounded"
							required
						/>
					</div>

					<div>
						<label className="block text-lg font-semibold">Confirm Password</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full p-2 border-2 border-gray-300 rounded"
							required
						/>
					</div>

					<div className="flex justify-center pt-4">
						<button
							type="submit"
							disabled={loading}
							className={`text-xl rounded font-sans font-semibold px-3 py-2 border border-black/50 
                                ${loading
								? 'bg-gray-300 cursor-not-allowed'
								: 'bg-white hover:bg-black hover:text-white hover:shadow-2xl transition-all duration-300'
							}`}
						>
							{loading ? 'Processing...' : 'Confirm'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangePasswordModal;