import React, { useEffect, useState } from "react";
import moment from "moment";
import API from "../../api/api.jsx";
import AppointmentCalendar from "../dashboard/components/AppointmentCalendar.jsx";
import Layout from "../partials/Layout.jsx";
import BookAppointment from "../../components/BookAppointment.jsx";
import AppointmentCards from "../dashboard/components/extras/AppointmentCards.jsx";
import {navigate} from "react-big-calendar/lib/utils/constants.js";
import {useNavigate} from "react-router-dom";

const Appointments = () => {
	const [appointments, setAppointments] = useState([]);
	const [bookAppointment, setBookAppointment] = useState(false);
	const [stats, setStats] = useState({
		dailyPending: 0,
		dailyRevenue: 0,
		monthlyFinishedCount: 0,
		monthlyRevenue: 0
	});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await API.get("/api/appointments");
				const fetchedAppointments = response.data;
				setAppointments(fetchedAppointments);
				computeStats(fetchedAppointments);
			} catch (error) {
				console.log("Error fetching dashboard data:", error);
				alert("You are not authorized to view this page.");
				navigate('/admin');
			}
		};

		fetchData();
	}, []);

	const computeStats = (appointments) => {
		// Get today's and current month's dates using moment
		const today = moment();
		const startOfDay = moment().startOf('day');
		const endOfDay = moment().endOf('day');
		const startOfMonth = moment().startOf('month');
		const endOfMonth = moment().endOf('month');

		// Today's appointments
		const todaysAppointments = appointments.filter((appt) =>
			moment(appt.date).isBetween(startOfDay, endOfDay, null, "[]")
		);

		// Daily Pending Count
		const dailyPending = todaysAppointments.filter(
			(appt) => appt.status === "Pending" || "Finished"
		).length;

		// Daily Revenue (from finished appointments)
		const dailyRevenue = todaysAppointments
			.filter((appt) => appt.status === "Finished")
			.reduce((sum, appt) => sum + (appt.service?.price || 0), 0);

		// Current Month's finished appointments
		const monthlyAppointments = appointments.filter((appt) =>
			moment(appt.date).isBetween(startOfMonth, endOfMonth, null, "[]")
		);

		const finishedMonthlyAppointments = monthlyAppointments.filter(
			(appt) => appt.status === "Finished"
		);
		const monthlyFinishedCount = finishedMonthlyAppointments.length;
		const monthlyRevenue = finishedMonthlyAppointments.reduce(
			(sum, appt) => sum + (appt.service?.price || 0),
			0
		);

		setStats({
			dailyPending,
			dailyRevenue,
			monthlyFinishedCount,
			monthlyRevenue
		});
	};

	const handleBookAppointment = () => {
		setBookAppointment(true);
	};

	return (
		<Layout>
			<h1 className="pt-6 text-2xl font-bold mb-4">
				Appointments Calendar
			</h1>
			<div className="p-3">
				<AppointmentCards stats={stats} />
			</div>
			{appointments.length ? (
				<AppointmentCalendar appointments={appointments} />
			) : appointments.length === 0 ? (
				<div className='flex justify-center items-center align-middle'>
				<div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
				</div>
			) : (
				<p>Loading appointments...</p>
			)}
			<div className="flex justify-end pt-6">
				<button
					onClick={handleBookAppointment}
					className="font-sans font-semibold px-5 py-4 text-white border-2 border-black bg-black hover:bg-white hover:text-black transition-all duration-300"
				>
					Set an Appointment
				</button>
			</div>
			{bookAppointment && (
				<BookAppointment
					onClose={() => setBookAppointment(false)}
					onAppointmentMade={(newAppointment) => {
						setAppointments((prev) => [...prev, newAppointment]);
						// Recompute stats after adding a new appointment
						computeStats([...appointments, newAppointment]);
					}}
				/>
			)}
		</Layout>
	);
};

export default Appointments;
