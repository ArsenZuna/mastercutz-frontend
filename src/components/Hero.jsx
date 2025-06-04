import React, {useState} from 'react';
import HeroImage from '../../public/assets/heroImage.jpg';
import {motion} from 'framer-motion';
import {fadeIn} from '../utils/variants.jsx';
import BookAppointment from "./BookAppointment.jsx";

const Hero = () => {
	const [appointment, setAppointment] = useState([]);
	const [bookAppointment, setBookAppointment] = useState(false);

	const handleBookAppointment = () => {
		setBookAppointment(true);
	}

	return (
		<div className='pt-24'>
			{/* Hero Image with Text */}
			<div className='relative w-full h-[65vh] flex flex-col items-center justify-center bg-black/50'>
				<img
					src={HeroImage}
					alt='Hero'
					className='w-full h-full object-cover brightness-50'
				/>
				{/* Hero Text */}
				<motion.h3
					variants={fadeIn('up')}
					initial='hidden'
					whileInView='show'
					viewport={{once: true, amount: 0.7}}
					className='absolute text-2xl md:text-4xl lg:text-6xl font-sans uppercase font-bold text-white text-center mb-56'
				>
					The Best Hairstudio In Town
				</motion.h3>
				<motion.p
					variants={fadeIn('up')}
					initial='hidden'
					whileInView='show'
					viewport={{once: true, amount: 0.7}}
					className='absolute text-sm lg:text-md font-sans uppercase font-semibold text-white text-center'>
					Our goal is to match the client's wishes to their hair and image with technical and professional advice for the best possible result.
				</motion.p>
				<motion.div
					variants={fadeIn('up')}
					initial='hidden'
					whileInView='show'
					viewport={{once: true, amount: 0.7}}
					className='absolute flex justify-center text-2xl text-white mt-56'>
					<button
						onClick={handleBookAppointment}
						className='font-sans font-semibold px-5 py-4 border border-white/50 bg-none hover:bg-white hover:text-black transition-all duration-300'>
						Book an Appointment
					</button>
				</motion.div>
			</div>
			{bookAppointment && (
				<BookAppointment
					onClose={() => setBookAppointment(false)}
					onAppointmentMade={(newAppointment) => {
						setAppointment([...appointment, newAppointment])
					}}
				/>
			)}
		</div>
	);
};

export default Hero;
