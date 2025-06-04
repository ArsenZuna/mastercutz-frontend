import {useEffect, useState} from "react";
import API from "../../../api/api.jsx";
import {motion} from "framer-motion";
import {fadeIn} from "../../../utils/variants.jsx";
import StaffEditModal from "./extras/StaffEditModal.jsx";
import AddMemberForm from "./extras/AddMemberForm.jsx";
import useAuthStore from "../../utils/authStore.jsx";

const Staff = () => {
	const admin = useAuthStore((state) => state.admin);
	const [staff, setStaff] = useState([]);
	const [selectedStaff, setSelectedStaff] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [addMemberOpen, setAddMemberOpen] = useState(false);

	const handleEditClick = (member) => {
		setSelectedStaff(member);
		setIsModalOpen(true);
	};

	const handleAddMemberClick = () => {
		setAddMemberOpen(true);
	}

	const handleStatusToggle = async () => {
		if (!selectedStaff) return;
		try {
			const response = await API.patch(`/api/staff/${selectedStaff.id}/status`);
			setStaff((prevStaff) =>
				prevStaff.map((member) =>
					member.id === selectedStaff.id ? {...member, status: response.data.status} : member
				)
			);
			setSelectedStaff((prev) => ({...prev, status: response.data.status}));
		} catch (error) {
			console.error("Failed to update status:", error);
			alert("Error updating status");
		}
	};

	/*const handleMoveShop = async (newShopId) => {
		if (!selectedStaff) return;

		try {
			const response = await API.patch(`/api/staff/${selectedStaff.id}/move`, { newShopId });

			// Update staff list
			setStaff((prevStaff) =>
				prevStaff.map((member) =>
					member.id === selectedStaff.id ? { ...member, shop: response.data.shop } : member
				)
			);

			// Update selected staff state
			setSelectedStaff((prev) => ({ ...prev, shop: response.data.shop }));

			alert("Staff member moved successfully!");
		} catch (error) {
			console.error("Failed to move staff:", error);
			alert("Error moving staff");
		}
	};*/

	useEffect(() => {
		const fetchStaff = async () => {
			try {
				const response = await API.get('/api/staff');
				setStaff(response.data);
			} catch (error) {
				console.log("ERROR", error)
				alert("ERROR");
			}
		};
		fetchStaff();
	}, []);

	return (
		<>
			<div className='flex justify-end p-4'>
				<button
					className='rounded font-sans font-semibold px-2 py-1 border border-black/50 bg-white hover:bg-black hover:text-white hover:shadow-2xl transition-all duration-300 m-2'
					onClick={handleAddMemberClick}
				>
					Add Member
				</button>
			</div>
			<motion.div
				variants={fadeIn('up')}
				initial='hidden'
				whileInView='show'
				viewport={{once: false, amount: 0.3}}
				className="bg-white rounded-xl shadow-sm">
				<div className="bg-black p-6 rounded-t-xl">
					<h2 className="text-white text-lg font-medium">{admin.name}</h2>
				</div>
				<div className="overflow-x-auto px-0 pt-0 pb-2">
					{staff.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							No staff members found
						</div>
					)}
					<table className="w-full">
						<thead>
						<tr className='border-b border-gray-200'>
							<th className='text-xs font-semibold text-gray-500 uppercase tracking-wider text-left py-4 px-6'>
								Member
							</th>
							<th className='text-xs font-semibold text-gray-500 uppercase tracking-wider text-left py-4 px-6'>
								Role
							</th>
							<th className='text-xs font-semibold text-gray-500 uppercase tracking-wider text-left py-4 px-6'>
								Status
							</th>
							<th className='text-xs font-semibold text-gray-500 uppercase tracking-wider text-left py-4 px-6'>
								Shop
							</th>
						</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
						{staff.map((member) => {
							return (
								<tr key={member.id} className="hover:bg-gray-50 transition-colors duration-200">
									{/* AUTHOR Column */}
									<td className="py-4 px-6">
										<div className="flex items-center space-x-4">
											<img
												src={member.image}
												alt={member.name}
												className="h-10 w-10 rounded-lg object-cover"
											/>
											<div>
												<div className="font-bold text-gray-900">{member.name}</div>
												<div className="text-sm text-gray-500">{member.phone}</div>
											</div>
										</div>
									</td>
									<td className="py-4 px-6">
                    <span className="text-sm font-semibold text-gray-900">
                      {member.role}
                    </span>
									</td>
									<td className="py-4 px-6">
										{member.status ? (
											<span
												className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
													Working
                      </span>
										) : (
											<span
												className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Day-off
                      </span>
										)}
									</td>
									<td className="py-4 px-6">
                    <span className="text-sm text-gray-900 font-semibold">
                      {member.shop.name}
                    </span>
									</td>
									<td className="py-4 px-6">
										<button className="text-blue-600 hover:text-blue-900 text-sm font-medium"
														onClick={() => handleEditClick(member)}>
											Edit
										</button>
									</td>
								</tr>
							);
						})}
						</tbody>
					</table>
				</div>

				{addMemberOpen && (
					<AddMemberForm
						onClose={() => setAddMemberOpen(false)}
						onMemberAdded={(newMember) => {
							setStaff([...staff, newMember]);
							setAddMemberOpen(false);
						}}
					/>
				)}

				<StaffEditModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					staff={selectedStaff}
					onStatusToggle={handleStatusToggle}
					onMemberDeleted={(id) => {
						setStaff(staff.filter((member) => member.id !== id));
						setIsModalOpen(false);
					}}
				/>
			</motion.div>
		</>
	)
}

export default Staff;
