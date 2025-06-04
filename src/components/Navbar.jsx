	import React from 'react';
import {motion} from 'framer-motion';
import {fadeIn} from '../utils/variants.jsx';

const Navbar = () => {
	return (
		<header className='w-full flex pt-8 pb-5 justify-center lg:justify-between items-center absolute'>
			{/* Logo Section */}
			<div className='text-center lg:text-left ml-4 lg:ml-32'>
				<motion.h1
					variants={fadeIn('right')}
					initial='hidden'
					whileInView='show'
					viewport={{ once: true, amount: 0.3 }}
					className='text-3xl uppercase font-bold font-sans'>
					Mastercutz.
				</motion.h1>
			</div>

			{/* Button Section (hidden on small screens) */}
			{/*<div className='hidden lg:block mr-10 lg:mr-32'>
				<motion.button
					variants={fadeIn('left')}
					initial='hidden'
					whileInView='show'
					viewport={{once: true, amount: 0.3}}
					className='font-sans font-primary font-semibold px-2 py-2 border border-black/70 hover:bg-black hover:text-white transition-all duration-300'>
					Book Now
				</motion.button>
			</div>*/}
		</header>
	);
};

export default Navbar;
