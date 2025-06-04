import React, { useState } from "react";
import API from "../../../../api/api.jsx"; // <-- Make sure this is imported
import moment from "moment";
import { Trash2 } from "lucide-react";

const AppointmentDetails = ({ selectedAppointment, setSelectedAppointment, handleUpdateStatus }) => {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const handleAppointmentDeletion = async () => {
		try {
			// Use the _id property from the appointment
			await API.delete(`/api/appointments/${selectedAppointment._id}`);
			setSelectedAppointment(null);
			window.location.reload();
		} catch (error) {
			console.error("Error deleting appointment: ", error.response?.data || error.message );
			alert("Error deleting appointment, try again later!");
		}
	};

	if (!selectedAppointment) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			{/* Delete Confirmation Modal */}
			{showDeleteConfirmation && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
					style={{ zIndex: 100 }}
				>
					<div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
						<h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
						<p className="mb-4">
							Are you sure you want to permanently delete this appointment?
						</p>
						<div className="flex justify-end space-x-4">
							<button
								className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
								onClick={() => setShowDeleteConfirmation(false)}
							>
								No
							</button>
							<button
								className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
								onClick={() => {
									setShowDeleteConfirmation(false);
									handleAppointmentDeletion();
								}}
							>
								Yes
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative z-50">
				<div className="flex justify-between border-b-2">
					<h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
					<div className="grid grid-cols-2 gap-4 mb-3">
						<button
							className="text-gray-500 rounded hover:text-red-500 transition-all duration-300"
							onClick={() => setShowDeleteConfirmation(true)}
						>
							<Trash2 size={18} />
						</button>
						<button
							className="font-semibold text-gray-500 rounded hover:text-black transition-all duration-300"
							onClick={() => setSelectedAppointment(null)}
						>
							X
						</button>
					</div>
				</div>
				<div className="border-b-2 mt-4 text-lg">
					<p>
						<strong>Customer:</strong> {selectedAppointment.customerName}
					</p>
					<p>
						<strong>Phone:</strong> {selectedAppointment.customerPhone}
					</p>
					<p>
						<strong>Date:</strong>{" "}
						{moment(selectedAppointment.date).format("DD-MM-YYYY")}
					</p>
					<p>
						<strong>Time:</strong> {selectedAppointment.time}
					</p>
					<p>
						<strong>Service:</strong> {selectedAppointment.service.name}
					</p>
					<p>
						<strong>Cost:</strong> {selectedAppointment.service.price}{" "}
						{selectedAppointment.service.currency}
					</p>
					<p>
						<strong>Barber:</strong> {selectedAppointment.barber.name}
					</p>
					<p className="mb-4">
						<strong>Status:</strong> {selectedAppointment.status}
					</p>
				</div>
				<div className="flex justify-between">
					<button
						className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-700 transition-all duration-300 text-white rounded"
						onClick={() => handleUpdateStatus("Cancelled")}
					>
						Cancel
					</button>
					<button
						className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-700 transition-all duration-300 text-white rounded"
						onClick={() => handleUpdateStatus("Pending")}
					>
						Pending
					</button>
					<button
						className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-700 transition-all duration-300 text-white rounded"
						onClick={() => handleUpdateStatus("Finished")}
					>
						Finish
					</button>
				</div>
			</div>
		</div>
	);
};

export default AppointmentDetails;
