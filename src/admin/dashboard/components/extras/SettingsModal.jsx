import React, {useState} from "react";
import useAuthStore from "../../../utils/authStore.jsx";
import ChangePasswordModal from "./ChangePasswordModal.jsx";

const SettingsModal = ({onClose}) => {
	const admin = useAuthStore((state) => state.admin);
	const [changePassword, setChangePassword] = useState(false);

	const handleChangePassword = () => {
		setChangePassword(!changePassword);
	}

	return (
		<>
			<div
				className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
				onClick={onClose} // Close modal when clicking on the background
			>
				<div
					className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative"
					onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
				>
					<h3 className="text-3xl font-bold mb-4">Settings</h3>
					<p className="text-lg mb-4">
						{admin.name}, here you can change your password if you want to. Click on the button below and fill the
						inputs that show up based on their labels.
					</p>
					<div className="flex justify-end space-x-4">
						<button
							className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
							onClick={handleChangePassword}
						>
							Change Password
						</button>
					</div>
				</div>
			</div>
			{changePassword && <ChangePasswordModal onClose={handleChangePassword}/>}
		</>
	);
};

export default SettingsModal;
