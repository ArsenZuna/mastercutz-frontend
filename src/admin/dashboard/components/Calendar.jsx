import React, { useState } from "react";
import {
	format,
	addDays,
	subDays,
	addMonths,
	subMonths,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	isSameDay,
	isSameMonth,
	isToday,
} from "date-fns";

const VIEWS = {
	DAY: "day",
	WEEK: "week",
	MONTH: "month",
};

export default function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date(2022, 0, 12));
	const [currentView, setCurrentView] = useState(VIEWS.DAY);

	// Handlers for navigation
	const handleToday = () => {
		setCurrentDate(new Date());
	};

	const handlePrev = () => {
		if (currentView === VIEWS.DAY) {
			setCurrentDate(subDays(currentDate, 1));
		} else if (currentView === VIEWS.WEEK) {
			setCurrentDate(subDays(currentDate, 7));
		} else {
			setCurrentDate(subMonths(currentDate, 1));
		}
	};

	const handleNext = () => {
		if (currentView === VIEWS.DAY) {
			setCurrentDate(addDays(currentDate, 1));
		} else if (currentView === VIEWS.WEEK) {
			setCurrentDate(addDays(currentDate, 7));
		} else {
			setCurrentDate(addMonths(currentDate, 1));
		}
	};

	// Filter events for the currently displayed range
	const getEventsForDay = (day) => {
		return events.filter((event) =>
			isSameDay(event.date, day)
		);
	};

	// Render different views
	const renderDayView = () => {
		// We'll display hours from 8 AM to 10 PM, for example
		const hours = Array.from({ length: 17 }, (_, i) => i + 6);

		return (
			<div className="border p-4 rounded">
				<h2 className="text-lg font-bold mb-4">
					Day View - {format(currentDate, "MMMM dd, yyyy")}
				</h2>
				<div className="space-y-2">
					{hours.map((hour) => {
						const dateAtHour = new Date(
							currentDate.getFullYear(),
							currentDate.getMonth(),
							currentDate.getDate(),
							hour
						);
						const dayEvents = getEventsForDay(dateAtHour);

						return (
							<div
								key={hour}
								className="border rounded p-2 flex justify-between items-center"
							>
								<div>
                  <span className="font-semibold">
                    {format(dateAtHour, "hh:mm a")}
                  </span>
								</div>
								<div>
									{dayEvents.map((event, idx) => (
										<div key={idx} className="text-sm bg-blue-100 p-1 rounded">
											{event.title}
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	const renderWeekView = () => {
		const start = startOfWeek(currentDate, { weekStartsOn: 0 });
		const end = endOfWeek(currentDate, { weekStartsOn: 0 });
		const days = eachDayOfInterval({ start, end });

		return (
			<div className="border p-4 rounded">
				<h2 className="text-lg font-bold mb-4">
					Week View ({format(start, "MMM dd")} - {format(end, "MMM dd, yyyy")})
				</h2>
				<div className="grid grid-cols-7 gap-4">
					{days.map((day) => (
						<div key={day} className="border rounded p-2">
							<div
								className={`font-bold mb-2 ${
									isToday(day) ? "text-red-500" : ""
								}`}
							>
								{format(day, "EEE dd")}
							</div>
							<div className="space-y-1">
								{getEventsForDay(day).map((event, idx) => (
									<div
										key={idx}
										className="bg-blue-100 text-sm p-1 rounded"
									>
										{event.title} @ {format(event.date, "hh:mm a")}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	const renderMonthView = () => {
		const start = startOfMonth(currentDate);
		const end = endOfMonth(currentDate);
		const days = eachDayOfInterval({ start, end });

		// We can chunk days into weeks (rows of the month view).
		// For simplicity, let's just show them in a grid with 7 columns (Sun-Sat).
		// We'll figure out how many leading spaces we need from the first day of the month
		// and trailing spaces for the last day. This is optional if you want a neat calendar.

		// We'll simply place the days in a grid ignoring leftover spaces for brevity.
		return (
			<div className="border p-4 rounded">
				<h2 className="text-lg font-bold mb-4">
					Month View - {format(currentDate, "MMMM yyyy")}
				</h2>
				<div className="grid grid-cols-7 gap-4">
					{/* Headings for Sun-Sat */}
					{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
						<div key={dayName} className="text-center font-bold">
							{dayName}
						</div>
					))}
					{/* Days of the month */}
					{days.map((day) => (
						<div
							key={day}
							className={`border rounded p-2 min-h-[80px] ${
								isSameMonth(day, currentDate) ? "" : "bg-gray-50 text-gray-400"
							} ${isToday(day) ? "border-red-500" : ""}`}
						>
							<div className="text-sm font-semibold">
								{format(day, "d")}
							</div>
							<div className="space-y-1 mt-1">
								{getEventsForDay(day).map((event, idx) => (
									<div
										key={idx}
										className="bg-blue-100 text-xs p-1 rounded"
									>
										{event.title}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="max-w-5xl mx-auto p-4">
			{/* Header Controls */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex space-x-2">
					<button
						onClick={handlePrev}
						className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
					>
						&larr;
					</button>
					<button
						onClick={handleToday}
						className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
					>
						Today
					</button>
					<button
						onClick={handleNext}
						className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
					>
						&rarr;
					</button>
				</div>

				<div className="space-x-2">
					<button
						onClick={() => setCurrentView(VIEWS.DAY)}
						className={`px-3 py-1 rounded ${
							currentView === VIEWS.DAY ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}
					>
						Day view
					</button>
					<button
						onClick={() => setCurrentView(VIEWS.WEEK)}
						className={`px-3 py-1 rounded ${
							currentView === VIEWS.WEEK ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}
					>
						Week view
					</button>
					<button
						onClick={() => setCurrentView(VIEWS.MONTH)}
						className={`px-3 py-1 rounded ${
							currentView === VIEWS.MONTH ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}
					>
						Month view
					</button>
				</div>
			</div>

			{/* Calendar Body */}
			{currentView === VIEWS.DAY && renderDayView()}
			{currentView === VIEWS.WEEK && renderWeekView()}
			{currentView === VIEWS.MONTH && renderMonthView()}
		</div>
	);
}
