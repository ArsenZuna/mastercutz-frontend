import React, { useState } from "react";
import Logo from "../../../../public/assets/logo.png";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../utils/authStore.jsx";
import { Settings, LogOut } from "lucide-react";
import SettingsModal from "./extras/SettingsModal.jsx";

const Sidebar = ({ isOpen, onClose }) => {
	const admin = useAuthStore((state) => state.admin);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Manage modal visibility

	const handleLogout = () => {
		logout();
		navigate("/admin");
	};

	const handleSettings = () => {
		setIsSettingsOpen(true); // Show the modal
	};

	const closeSettings = () => {
		setIsSettingsOpen(false); // Hide the modal
	};

	const goToAppointments = () => navigate("/appointments");
	const goToProfile = () => navigate("/dashboard/profile");
	const goToBarbers = () => navigate("/dashboard/staff");
	const goToFinances = () => navigate("/dashboard/finances");

	return (
		<>
			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
					onClick={onClose}
				/>
			)}

			<div
				className={`fixed md:relative left-0 top-0 h-[970px] w-72 border-2 border-black/15 rounded-xl bg-white transform transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 z-50`}
			>
				<div className="flex justify-center mt-10">
					<img className="w-[120px] h-[120px] rounded-md shadow-md" src={Logo} alt="logo" />
				</div>
				<div className="text-center mt-4 text-lg font-bold">
					<div className="mt-8">
						<h2 className="text-xl text-black text-center font-bold">
							Welcome, {admin?.name || "Admin"}!
						</h2>
					</div>
				</div>
				<div className="flex justify-center">
					<ul className="w-64 mt-5 text-lg text-gray-600 font-bold text-center mx-4">
						<li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={goToAppointments}>
							Appointments
						</li>
						<li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={goToFinances}>
							Finances
						</li>
						{admin?.role === "admin" && (
							<li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={goToBarbers}>
								Staff
							</li>
						)}
					</ul>
				</div>
				<div className="flex justify-center gap-5 mt-[375px]">
					<button
						onClick={handleSettings}
						className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
					>
						<Settings size={35} />
					</button>
					<button
						onClick={handleLogout}
						className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
					>
						<LogOut size={35} />
					</button>
				</div>
			</div>

			{/* Render the SettingsModal if isSettingsOpen is true */}
			{isSettingsOpen && <SettingsModal onClose={closeSettings} />}
		</>
	);
};

export default Sidebar;
