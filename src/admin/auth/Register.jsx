import {useState} from "react";
import API from "../../api/api.jsx";
import {useNavigate} from "react-router-dom";

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		name: '',
		password: '',
		address: '',
		phone: '',
		role: ''
	});
	const navigate = useNavigate();

	const {username, name, password, address, phone, role} = formData;

	const handleChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	}
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await API.post('/api/auth/register', formData);
			console.log('Register response:', response);
			alert('Register Successful');
			navigate('/admin');
			alert('Please try to login now');
		} catch (error) {
			console.log('Login error:', error.response?.data || error.message);
			alert('Login FAILED. Please check your credentials.');
		}
	};


	return (
		<section className="flex justify-center items-center mx-[125px]">
			<div className="w-full lg:w-3/5">
				<div className="text-center">
					<h2 className="text-4xl font-bold mb-4">Register</h2>
					<p className="text-lg text-blue-gray-700 font-normal">
						Enter your credentials to access the admin dashboard.
					</p>
				</div>
				<form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleFormSubmit}>
					<div className="mb-1 flex flex-col gap-6">
						<label className="text-md text-gray-800 font-medium -mb-3">
							Username
						</label>
						<input
							name="username"
							type="text"
							placeholder="Enter username here..."
							className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
							value={username}
							onChange={handleChange}
						/>
						<label className="text-md text-gray-800 font-medium -mb-3">
							Name
						</label>
						<input
							name="name"
							type="text"
							placeholder="Enter name here..."
							className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
							value={name}
							onChange={handleChange}
						/>
						<label className="text-md text-gray-800 font-medium -mb-3">
							Password
						</label>
						<input
							name="password"
							type="password"
							placeholder="********"
							className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
							value={password}
							onChange={handleChange}
						/>
						<label className="text-md text-gray-800 font-medium -mb-3">
							Address
						</label>
						<input
							name="address"
							type="text"
							placeholder="Enter address here..."
							className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
							value={address}
							onChange={handleChange}
						/><label className="text-md text-gray-800 font-medium -mb-3">
						Phone Number
					</label>
						<input
							name="phone"
							type="text"
							placeholder="Enter phone number here..."
							className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
							value={phone}
							onChange={handleChange}
						/><label className="text-md text-gray-800 font-medium -mb-3">
						Role
					</label>
						<select
							name="role"
							value={role}
							onChange={handleChange}
							className="font-semibold p-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
						>
							<option value="">Select a role</option>
							<option value="admin">Administrator</option>
							<option value="barber">Barber</option>
						</select>
					</div>
					<div className='flex justify-center items-center align-middle'>
						<button
							type="submit"
							className="mt-8 w-80 bg-black text-white py-3 px-5 rounded-lg hover:bg-gray-800 transition-colors"
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}

export default Register;