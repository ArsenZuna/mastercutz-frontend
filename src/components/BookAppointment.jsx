import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../api/api.jsx";

const BookAppointment = ({ onClose, onAppointmentMade }) => {
	const [formData, setFormData] = useState({
		customerName: "",
		customerPhone: "",
		date: "",
		time: "",
		service: "",
		barber: ""
	});
	const [barbers, setBarbers] = useState([]);
	const [services, setServices] = useState([]);
	const [availableTimes, setAvailableTimes] = useState([]);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const { customerName, customerPhone, date, time, service, barber } = formData;

	// Fetch available barbers from the public endpoint
	useEffect(() => {
		const fetchBarbers = async () => {
			try {
				const response = await API.get("/api/barbers/public");
				setBarbers(response.data);
			} catch (error) {
				console.error("Error fetching barbers: ", error);
			}
		};
		fetchBarbers();
	}, []);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await API.get('/api/services');
				setServices(response.data);
			} catch (error) {
				console.log("Error while fetching services!", error);
				alert('ERROR FETCHING SERVICES');
			}
		};

		fetchServices();
	}, []);

	// When the user selects a barber and date, fetch the appointments and compute free slots.
	useEffect(() => {
		const fetchAvailableTimes = async () => {
			if (!barber || !date) {
				setAvailableTimes([]);
				return;
			}
			try {
				// Query appointments for this barber on the selected date.
				const response = await API.get(
					`/api/public/appointments?barber=${barber}&date=${date}`
				);
				const appointments = response.data;
				const bookedSlots = appointments.map((appt) => appt.time);
				// Generate all possible time slots between 09:00 and 20:00 (e.g., 30-min intervals)
				const allSlots = generateSlots("09:00", "20:00", 30);
				// Filter out the booked slots
				const freeSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
				setAvailableTimes(freeSlots);
			} catch (error) {
				console.error("Error fetching appointments: ", error);
			}
		};

		fetchAvailableTimes();
	}, [barber, date]);

	// Helper function to generate time slots (in "HH:MM" format)
	const generateSlots = (start, end, interval) => {
		const slots = [];
		let [startHour, startMinute] = start.split(":").map(Number);
		let [endHour, endMinute] = end.split(":").map(Number);
		let current = new Date();
		current.setHours(startHour, startMinute, 0, 0);
		const endTime = new Date();
		endTime.setHours(endHour, endMinute, 0, 0);
		while (current <= endTime) {
			const hh = current.getHours().toString().padStart(2, "0");
			const mm = current.getMinutes().toString().padStart(2, "0");
			slots.push(`${hh}:${mm}`);
			current = new Date(current.getTime() + interval * 60000);
		}
		return slots;
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		try {
			const response = await API.post("/api/appointments", formData);
			if (onAppointmentMade) onAppointmentMade(response.data);
			setSuccess("Your Appointment Has Been Made. See you soon!");
			setTimeout(() => {
				onClose();
			}, 1500);
		} catch (error) {
			setError(error.response?.data?.message || "Something went wrong. Please try again later!");
		}
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto text-black">
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
							Book an Appointment
						</h3>
					</div>
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
					<form
						className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
						onSubmit={handleFormSubmit}
					>
						<div className="mb-1 flex flex-col gap-5">
							<label className="text-md text-gray-800 font-medium -mb-2">
								Name
							</label>
							<input
								name="customerName"
								type="text"
								placeholder="Enter your name..."
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								value={customerName}
								onChange={handleChange}
								required
							/>
							<label className="text-md text-gray-800 font-medium -mb-2">
								Phone Number
							</label>
							<input
								name="customerPhone"
								type="text"
								placeholder="+355 xxx"
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								value={customerPhone}
								onChange={handleChange}
								required
							/>
							<label className="text-md text-gray-800 font-medium -mb-2">
								Barber
							</label>
							<select
								name="barber"
								value={barber}
								onChange={handleChange}
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								required
							>
								<option value="">Select Barber</option>
								{barbers.map((b) => (
									<option
										key={b.id}
										value={b.id}
										disabled={!b.status}
									>
										{b.name}{" "}
										{!b.status && "(Day-off)"}
									</option>
								))}
							</select>
							<label className="text-md text-gray-800 font-medium -mb-2">
								Service
							</label>
							<select
								name="service"
								value={service}
								onChange={handleChange}
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								required
							>
								<option value="">Select Service</option>
								{services.map((s) => (
									<option
										key={s.id}
										value={s.id}
									>
										{s.name}{" "}
									</option>
								))}
							</select>
							<label className="text-md text-gray-800 font-medium -mb-2">
								Appointment Date
							</label>
							<input
								name="date"
								type="date"
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								value={date}
								onChange={handleChange}
								// Disable previous dates by setting the min attribute to today's date.
								min={new Date().toISOString().split("T")[0]}
							/>
							<label className="text-md text-gray-800 font-medium -mb-2">
								Appointment Time
							</label>
							<select
								name="time"
								value={time}
								onChange={handleChange}
								className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
								required
							>
								<option value="">Select Time</option>
								{availableTimes.map((slot) => (
									<option key={slot} value={slot}>
										{slot}
									</option>
								))}
							</select>
						</div>
						<div className="flex justify-center">
							<button
								type="submit"
								className="mt-8 w-80 bg-black text-white py-3 px-5 rounded-lg hover:bg-gray-800 transition-colors"
							>
								Submit
							</button>
						</div>
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default BookAppointment;