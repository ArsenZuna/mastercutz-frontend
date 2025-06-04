import React from "react";
import CountUp from "react-countup";

const AppointmentCards = ({ stats }) => {
	if (!stats) {
		return <p>Loading stats...</p>;
	}

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
			<div className="bg-white rounded-xl shadow-sm p-4">
				<p className="text-gray-500 text-sm mb-1">Today's Appointments</p>
				<p className="text-3xl font-bold">
					<CountUp end={stats.dailyPending} duration={2} />
				</p>
			</div>
			<div className="bg-white rounded-xl shadow-sm p-4">
				<p className="text-gray-500 text-sm mb-1">Today's Revenue</p>
				<p className="text-3xl font-bold">
					$<CountUp end={stats.dailyRevenue} duration={2} />
				</p>
			</div>
			<div className="bg-white rounded-xl shadow-sm p-4">
				<p className="text-gray-500 text-sm mb-1">
					Monthly Finished Appointments
				</p>
				<p className="text-3xl font-bold">
					<CountUp end={stats.monthlyFinishedCount} duration={2} />
				</p>
			</div>
			<div className="bg-white rounded-xl shadow-sm p-4">
				<p className="text-gray-500 text-sm mb-1">Monthly Revenue</p>
				<p className="text-3xl font-bold">
					$<CountUp end={stats.monthlyRevenue} duration={2} />
				</p>
			</div>
		</div>
	);
};

export default AppointmentCards;
