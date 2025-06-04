import React, { useState, useEffect } from "react";
import {
	subMonths,
	startOfMonth,
	endOfMonth,
	isWithinInterval,
	format,
} from "date-fns";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinanceView = ({ appointments }) => {
	const [monthlyFinances, setMonthlyFinances] = useState([]);
	const [chartView, setChartView] = useState(false);

	useEffect(() => {
		// Calculate finances for the past 14 months (current month + previous 13 months)
		const now = new Date();
		const currentMonthStart = startOfMonth(now);
		const monthsData = [];

		for (let i = 0; i < 14; i++) {
			// Subtract i months from the current month
			const monthStart = startOfMonth(subMonths(currentMonthStart, i));
			const monthEnd = endOfMonth(monthStart);
			// Adjust end to be inclusive by adding 1 millisecond
			const monthEndInclusive = new Date(monthEnd.getTime() + 1);

			// Filter finished appointments within this month
			const finishedAppointments = appointments.filter((appointment) => {
				const appointmentDate = new Date(appointment.date);
				return (
					appointment.status === "Finished" &&
					isWithinInterval(appointmentDate, { start: monthStart, end: monthEndInclusive })
				);
			});

			// Sum earnings from finished appointments
			const totalEarnings = finishedAppointments.reduce(
				(sum, appointment) => sum + (appointment.service.price || 0),
				0
			);

			monthsData.push({
				month: format(monthStart, "MMMM yyyy"),
				appointmentCount: finishedAppointments.length,
				earnings: totalEarnings,
			});
		}

		setMonthlyFinances(monthsData);
	}, [appointments]);

	// Prepare data for Chart.js
	const chartData = {
		labels: monthlyFinances.map((data) => data.month),
		datasets: [
			{
				label: "Earnings ($)",
				data: monthlyFinances.map((data) => data.earnings),
				backgroundColor: "rgba(75, 192, 192, 0.6)",
			}
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Monthly Finances",
			},
		},
	};

	return (
		<div>
			<h1 className="pt-6 text-2xl font-bold mb-4">Finances</h1>
			{/* Toggle switch */}
			<div className="hidden lg:block mb-4 font-semibold text-end mr-10">
				<button
					onClick={() => setChartView(false)}
					className={`px-4 py-2 rounded-l ${
						!chartView ? "bg-black text-white" : "bg-gray-200 text-black hover:text-white hover:bg-black/50 transition-all duration-300"
					}`}
				>
					Card
				</button>
				<button
					onClick={() => setChartView(true)}
					className={`px-4 py-2 rounded-r ${
						chartView ? "bg-black text-white" : "bg-gray-200 text-black hover:text-white hover:bg-black/50 transition-all duration-300"
					}`}
				>
					Chart
				</button>
			</div>

			{!chartView ? (
				// Cards view
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5">
					{monthlyFinances.map((data, idx) => (
						<div
							key={idx}
							className="p-4 border-2 rounded-xl bg-white flex flex-col hover:shadow-lg transition-all duration-300"
						>
							<h3 className="text-2xl font-bold mb-4">{data.month}</h3>
							<div>
								<p>
									Appointments: <span className="font-bold">{data.appointmentCount}</span>
								</p>
								<p>
									Earnings: <span className="font-bold">${data.earnings}</span>
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				// Chart view
				<div className="mt-8">
					<Bar data={chartData} options={options} />
				</div>
			)}
		</div>
	);
};

export default FinanceView;
