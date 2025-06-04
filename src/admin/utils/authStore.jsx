import { create } from "zustand";

// Load stored admin data from localStorage
const storedAdmin = JSON.parse(localStorage.getItem("admin")) || null;

const useAuthStore = create((set) => ({
	admin: storedAdmin, // Initialize with stored admin data
	token: localStorage.getItem("token") || null,

	login: (adminData, token) => {
		localStorage.setItem("admin", JSON.stringify(adminData)); // Save admin details
		localStorage.setItem("token", token); // Save token

		set({ admin: adminData, token });
	},

	logout: () => {
		localStorage.removeItem("admin");
		localStorage.removeItem("token");

		set({ admin: null, token: null });
	},
}));

export default useAuthStore;
