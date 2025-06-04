import Layout from "../partials/Layout.jsx";
import Staff from "../dashboard/components/Staff.jsx";

const StaffPanel = () => {
	return (
		<Layout>
			<div className='mx-5'>
				<h1 className="pt-6 text-2xl font-bold mb-4">Staff</h1>
				<Staff/>
			</div>
		</Layout>
	)
};

export default StaffPanel;