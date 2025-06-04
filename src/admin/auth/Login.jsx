import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../../api/api.jsx";
import useAuthStore from "../utils/authStore.jsx";

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const login = useAuthStore((state) => state.login); // Zustand login function
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await API.post("/api/auth/login", { username, password });
			const { token, admin } = response.data;

			login(admin, token); // ✅ Store admin in Zustand (and localStorage)
			alert("Login Successful");
			navigate('/appointments') // Redirect to dashboard
		} catch (error) {
			console.log("Login error:", error.response?.data || error.message);
			alert("Login FAILED. Please check your credentials.");
		}
	};


	return (
		<section className="flex justify-center items-center mt-[150px] lg:mt-[250px]">
			<div className="w-full lg:w-3/5">
				<div className="text-center">
					<h2 className="text-4xl font-bold mb-4">Login</h2>
					<p className="text-lg text-blue-gray-700 font-normal">
						Enter your credentials to access the admin dashboard.
					</p>
				</div>
				<form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleLogin}>
					<div className="mb-1 flex flex-col gap-6">
						<label className="text-md text-gray-800 font-medium -mb-3">
							Username
						</label>
						<input
							type="text"
							placeholder="Enter username here..."
							className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label className="text-md text-gray-800 font-medium -mb-3">
							Password
						</label>
						<input
							type="password"
							placeholder="********"
							className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='flex justify-center items-center align-middle'>
						<button
							type="submit"
							className="mt-8 w-80 bg-black text-white py-3 px-5 rounded-lg hover:bg-gray-800 transition-colors"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}

export default Login;