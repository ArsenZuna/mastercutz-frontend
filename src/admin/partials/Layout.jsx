import {useState} from "react";
import Sidebar from "../dashboard/components/Sidebar.jsx";


const Layout = ({children}) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<>
			<div className="bg-gray-100 min-h-screen">
				<div className="flex justify-center">
					<button
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className="md:hidden fixed top-5 right-5 z-50 p-2 bg-white rounded-lg shadow-md"
					>
						☰
					</button>
					<div className='p-3'>
						<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
					</div>
					<div className="mx-10 w-full">
						{children}
					</div>
				</div>
			</div>
		</>
	)
}

export default Layout;