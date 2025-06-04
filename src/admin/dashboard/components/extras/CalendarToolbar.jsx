import {motion} from 'framer-motion';
import {fadeIn} from "../../../../utils/variants.jsx";

const CalendarToolbar = (toolbar) => {
	return (
		<div className="flex justify-between items-center p-2">
			<motion.div
				variants={fadeIn('right')}
				initial='hidden'
				whileInView='show'
				viewport={{once: false, amount: 0.7}}
			>
				<button onClick={() => toolbar.onNavigate("TODAY")} className="rounded font-sans font-semibold px-2 py-1 border border-black/50 bg-white hover:bg-black hover:text-white hover:shadow-2xl transition-all duration-300 m-2">
					Today
				</button>
				<button onClick={() => toolbar.onNavigate("PREV")} className="rounded font-sans font-semibold px-2 py-1 border border-black/50 bg-white hover:bg-black hover:text-white hover:shadow-2xl transition-all duration-300 m-2">
					Back
				</button>
				<button onClick={() => toolbar.onNavigate("NEXT")} className="rounded font-sans font-semibold px-2 py-1 border border-black/50 bg-white hover:bg-black hover:text-white hover:shadow-2xl transition-all duration-300 m-2">
					Next
				</button>
			</motion.div>
			<motion.h3
				variants={fadeIn('left')}
				initial='hidden'
				whileInView='show'
				viewport={{once: false, amount: 0.7}}
				className="text-lg font-semibold m-2">
				{toolbar.label}
			</motion.h3>
		</div>
	);
};

export default CalendarToolbar;