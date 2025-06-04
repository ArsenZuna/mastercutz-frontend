import React, {useState} from "react";
import API from "../../../../api/api.jsx";
import {motion} from "framer-motion";

const StaffEditModal = ({isOpen, onClose, staff, onStatusToggle, onMemberDeleted}) => {
	if (!isOpen || !staff) return null;
	const [changePhone, setChangePhone] = useState(false);

	const handlePhoneChange = async (e) => {

	}

	const handleDelete = async () => {
		try {
			await API.delete(`/api/staff/${staff.id}`);
			// Call callback to update parent state if provided
			if (onMemberDeleted) {
				onMemberDeleted(staff.id);
			}
			onClose();
		} catch (error) {
			console.error("Error deleting staff:", error.response?.data || error.message);
			alert("Error deleting staff member, please try again later.");
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
					initial={{opacity: 0, scale: 0.95}}
					animate={{opacity: 1, scale: 1}}
					exit={{opacity: 0, scale: 0.95}}
					transition={{duration: 0.2}}
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
							Edit Staff Details
						</h3>
					</div>

					{/* Modal Content */}
					<div className="space-y-4">
						<div className="flex items-center space-x-4">
							<img
								src={staff.image}
								alt={staff.name}
								className="h-16 w-16 rounded-lg object-cover"
							/>
							<div>
								<h3 className="font-medium text-lg">{staff.name}</h3>
								<p className="text-gray-500">{staff.phone}</p>
							</div>
						</div>
						<div>
							<p className="text-gray-600">Role: {staff.role}</p>
							<p className="text-gray-600">
								Status: {staff.status ? "Working" : "Day-off"}
							</p>
							<p className="text-gray-600">Assigned to: {staff.shop.name}</p>
						</div>
						<div className="flex justify-end">
							<button
								className='rounded font-sans font-semibold px-2 py-1 border border-black/50 bg-white hover:bg-red-500 hover:text-white hover:shadow-2xl transition-all duration-300 m-2'
								onClick={handleDelete}
							>
								Change Phone Number
							</button>
							<button
								className='rounded font-sans font-semibold px-2 py-1 border border-black/50 bg-white hover:bg-red-500 hover:text-white hover:shadow-2xl transition-all duration-300 m-2'
								onClick={handleDelete}
							>
								Delete Member
							</button>
							<button
								onClick={onStatusToggle}
								className="rounded font-sans font-semibold px-2 py-1 border border-black/50 bg-white hover:bg-black hover:text-white hover:shadow-2xl transition-all duration-300 m-2"
							>
								Set {staff.status ? "Day-off" : "Working"}
							</button>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default StaffEditModal;
