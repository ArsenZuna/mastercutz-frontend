import React, {useEffect, useState} from 'react';
import Logo from '../../../../public/assets/logo.png';
import useAuthStore from "../../utils/authStore.jsx";
import API from "../../../api/api.jsx";

const UserProfile = () => {
	const admin = useAuthStore((state) => state.admin);
	const [user, setUser] = useState(null); // Initially set to null to handle loading state.

	useEffect(() => {
		const fetchStaff = async () => {
			try {
				const response = await API.get('/api/barbers/public');

				// Check if response.data is an array
				if (Array.isArray(response.data)) {
					const foundUser = response.data.find(
						(barber) =>
							barber.name.substring(0, 3).toLowerCase() === admin.name.substring(0, 3).toLowerCase()
					);
					setUser(foundUser || null); // Set to null if no match is found
				} else {
					console.error("Unexpected response format:", response.data);
					setUser(null);
				}
			} catch (error) {
				console.error("ERROR", error);
				alert("ERROR");
				setUser(null);
			}
		};
		fetchStaff();
	}, [admin.name]);

	return (
		<>
			<div className='container bg-black w-full h-80 mt-10'>
				<img src={Logo} alt='Logo' className='w-full h-full object-cover opacity-60'/>
			</div>
			<div className='container w-full bg-white h-[500px]'>
				{user ? (
					<div className='p-5'>
						<div className='flex'>
							<img src={user.image} alt={user.name}
									 className='rounded-full shadow-lg shadow-blue-gray-500/40 w-20 h-20'/>
							<h2 className='text-3xl font-bold pt-5 pl-3'>{user.name}</h2>
						</div>
						<div className='flex flex-col pt-7'>
							<h4 className='text-xl font-semibold italic text-gray-600'>Information</h4>
							<div className='pt-2 pl-4 font-semibold italic'>
								<p className='italic'>My name is {user.name} and I am a {user.role} at MasterCutz.</p>
							</div>
						</div>
					</div>
				) : (
					<p>No profile founded yet...</p>
				)}
			</div>
		</>
	);
};

export default UserProfile;
