import React from 'react';
import {motion} from 'framer-motion';
import {fadeIn} from '../utils/variants.jsx';

const About = () => {
	return (
		<>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-10 py-10 lg:py-14'>
				<motion.div
					variants={fadeIn('right')}
					initial='hidden'
					whileInView='show'
					viewport={{once: true, amount: 0.3}}
					className='mx-auto'
				>
					<h3 className='text-4xl text-center lg:text-start font-bold'>ABOUT US</h3>
					<p className='text-lg lg:text-xl mt-4 sm:mt-6'>
						Welcome to <span className='font-bold italic'>Mastercutz</span>, where tradition meets modern style in the
						heart of Lorem, Ipsum. Our skilled barbers provide personalized haircuts, beard trims, and styling to help you
						look
						and feel your best. Experience top-quality grooming in a welcoming space, so visit us today!
					</p>
				</motion.div>

				{/* Google Map */}
				<motion.div
					variants={fadeIn('up')}
					initial='hidden'
					whileInView='show'
					viewport={{once: true, amount: 0.3}}
					className='flex justify-center items-center'
				>
					<div className='grid grid-cols-1 gap-2'>
						<iframe width="500" height="300"
										src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=John%20Doe%20Street+(MasterCutz)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
							<a href="https://www.gps.ie/collections/sports-gps/">Sport GPS</a></iframe>
					</div>
				</motion.div>

				{/* Locations */}
				<motion.div
					variants={fadeIn('left')}
					initial='hidden'
					whileInView='show'
					viewport={{once: true, amount: 0.3}}
				>
					<div className='mt-5 text-center'>
						<div className='flex flex-col justify-center items-center align-middle mt-4'>
							<h2 className='text-lg sm:text-xl lg:text-3xl font-bold'>MASTERCUTZ</h2>
							<p className='mt-4 italic font-semibold'>John Doe Street, Lorem, Ipsum</p>
							<p className='mt-3 italic font-semibold'>+000 00 00 000</p>
						</div>
					</div>
					<div className='border-t-2 border-black/10 mt-10 text-center'>
						<div className='flex flex-col justify-center items-center align-middle mt-10'>
							<h2 className='text-lg sm:text-xl lg:text-3xl font-bold'>MASTERCUTZ</h2>
							<p className='mt-4 italic font-semibold'>Simon Doe Street, Lorem, Ipsum</p>
							<p className='mt-3 italic font-semibold'>+000 00 00 000</p>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
};

export default About;
