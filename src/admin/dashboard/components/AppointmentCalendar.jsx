import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarToolbar from "./extras/CalendarToolbar.jsx";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import API from "../../../api/api.jsx";
import AppointmentDetails from "./extras/AppointmentDetails.jsx";

const AppointmentCalendar = ({ appointments }) => {
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const localizer = momentLocalizer(moment);

	// Map each appointment into a Big Calendar event
	const events = appointments.map((appointment) => {
		// Combine date + time into one Date object for the start
		const dateObj = new Date(appointment.date);
		const [hour, minute] = appointment.time.split(":").map(Number);
		dateObj.setHours(hour, minute);

		// For the end time, assume +1 hour (adjust as needed)
		const endObj = new Date(dateObj);
		endObj.setHours(dateObj.getHours() + 1);

		return {
			title: `${appointment.customerName} (${appointment.status}) - (${appointment.barber?.name || "Unknown Barber"})`,
			start: dateObj,
			end: endObj,
			// Store the entire appointment for use in the modal
			resource: appointment,
		};
	});

	// State to handle the selected view: "day", "week", "month"
	const [view, setView] = useState("day");
	const handleViewChange = (e) => {
		setView(e.target.value);
	};

	// This function is called when an event is clicked
	const handleSelectEvent = (event) => {
		setSelectedAppointment(event.resource);
	};

	// Function to update appointment status
	const handleUpdateStatus = async (newStatus) => {
		try {
			// Use the appointment _id from the selected appointment
			const response = await API.patch(
				`/api/appointments/${selectedAppointment._id}/status`,
				{ status: newStatus }
			);
			// Update the modal with the updated appointment data
			setSelectedAppointment(response.data);
			// Optionally, you might also refresh the overall appointments list
			window.location.reload();
		} catch (error) {
			console.error(
				"Failed to update appointment status:",
				error.response?.data || error.message
			);
			alert("Failed to update appointment status. Please try again.");
		}
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		// Example: Different colors based on status
		const backgroundColor =
			event.resource.status === "Finished"
				? "#4CAF50" // Green
				: event.resource.status === "Cancelled"
					? "#F44336" // Red
					: "#FFC107"; // Default yellow

		const style = {
			backgroundColor,
			borderRadius: "10px",
			borderStyle: "solid",
			margin: "0px 0px 10px 10px",
			display: "block",
			fontSize: "14px",
			fontWeight: "700",
			padding: "2px 5px",
			minHeight: "28px",
		};

		return { style };
	};

	return (
		<div>
			{/* View Selection */}
			<div className="mb-4 flex items-center space-x-4">
				<label className="font-medium">View:</label>
				<select
					value={view}
					onChange={handleViewChange}
					className="p-2 border rounded bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden font-semibold"
				>
					<option value="day" className="text-black font-semibold">
						Daily
					</option>
					<option value="week" className="text-black font-semibold">
						Weekly
					</option>
					<option value="month" className="text-black font-semibold">
						Monthly
					</option>
				</select>
			</div>

			{/* Render the calendar */}
			<Calendar
				localizer={localizer}
				events={events}
				view={view === "hour" ? "day" : view}
				onView={() => {}}
				toolbar={true}
				components={{ toolbar: CalendarToolbar }}
				eventPropGetter={eventStyleGetter}
				defaultDate={new Date()}
				style={{ height: 600 }}
				onSelectEvent={handleSelectEvent}
				min={new Date(1970, 1, 1, 8, 0, 0)}
				max={new Date(1970, 1, 1, 23, 0, 0)}
			/>

			{/* Modal: Display appointment details when selectedAppointment is set */}
			{selectedAppointment && (
				<AppointmentDetails selectedAppointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment} handleUpdateStatus={handleUpdateStatus} />
			)}
		</div>
	);
};

export default AppointmentCalendar;