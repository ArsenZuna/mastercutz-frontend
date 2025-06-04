import Layout from "../partials/Layout.jsx";
import API from "../../api/api.jsx";
import FinanceView from "../dashboard/components/FinanceView.jsx";
import {useState, useEffect} from "react";

const Finances = () => {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const response = await API.get("/api/appointments");
				setAppointments(response.data);
			} catch (error) {
				console.error("Error fetching appointments:", error);
			}
		};

		fetchAppointments();
	}, []);


	return (
		<Layout>
			<FinanceView appointments={appointments}/>
		</Layout>
	);
};

export default Finances;