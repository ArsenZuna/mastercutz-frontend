import React, {useEffect} from 'react'
import API from "../api/api.jsx";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../utils/variants.jsx';

const Pricing = () => {
	const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
	const [services, setServices] = useState([])

	const testimonials = [
		{
			text: "I've been coming to this barbershop for over five years now, and I've never been disappointed. The barbers here are skilled, friendly, and always know the latest trends. Every visit is a great experience!",
			author: "John D."
		},
		{
			text: "Found this gem of a barbershop last year and haven't looked back since. The attention to detail in every haircut is remarkable. They take the time to understand exactly what you want and deliver every time.",
			author: "Maitland M."
		},
		{
			text: "Best barbershop in town! The atmosphere is welcoming, and the service is top-notch. I especially appreciate how they give advice on hair care and maintenance. It's more than just a haircut - it's an experience.",
			author: "Axel B."
		}
	]

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await API.get('/api/services');
				setServices(response.data);
			} catch (error) {
				console.log("Error while fetching services!", error);
				alert('ERROR FETCHING SERVICES');
			}
		};

		fetchServices();	
	}, []);

	const nextTestimonial = () => {
		setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
	}

	const prevTestimonial = () => {
		setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
	}

	return (
		<div className='container mx-auto px-4 pt-2 lg:py-6'>
			<div className='grid md:grid-cols-2 gap-5 lg:gap-2'>
				{/* Testimonial Card */}
				<motion.div
					variants={fadeIn('down')}
					initial='hidden'
					whileInView='show'
					viewport={{ once: true, amount: 0.3 }}
					className='w-full lg:w-2/3 bg-white/80 text-black rounded-2xl mx-auto lg:mx-12 p-6 shadow-lg'>
					<div className='relative overflow-hidden' style={{ height: '200px' }}>
						<AnimatePresence initial={false}>
							<motion.div
								key={currentTestimonialIndex}
								initial={{ opacity: 0, x: 300 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -300 }}
								transition={{ duration: 0.5 }}
								className='absolute inset-0'
							>
								<p className='mb-6 text-lg'>
									{testimonials[currentTestimonialIndex].text}
								</p>
							</motion.div>
						</AnimatePresence>
					</div>
					<div className='flex items-center justify-between mt-4'>
						<p className='font-semibold'>
							{testimonials[currentTestimonialIndex].author}
						</p>
						<div className='flex gap-2'>
							<button
								onClick={prevTestimonial}
								className='w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 hover:bg-gray-200 hover:text-black transition-colors'
								aria-label='Previous testimonial'
							>
								←
							</button>
							<button
								onClick={nextTestimonial}
								className='w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 hover:bg-gray-200 hover:text-black transition-colors'
								aria-label='Next testimonial'
							>
								→
							</button>
						</div>
					</div>
					{/* Added testimonial indicators */}
					<div className='flex justify-center gap-2 mt-4'>
						{testimonials.map((testimonial, index) => (
							<button
								key={index}
								onClick={() => setCurrentTestimonialIndex(index)}
								className={`w-2 h-2 rounded-full transition-colors ${
									currentTestimonialIndex === index ? 'bg-gray-100' : 'bg-gray-500'
								}`}
								aria-label={`Go to testimonial ${index + 1}`}
							/>
						))}
					</div>
				</motion.div>

				{/* Pricing Section */}
				<motion.div
					variants={fadeIn('up')}
					initial='hidden'
					whileInView='show'
					viewport={{ once: true, amount: 0.3 }}
					className='mx-1 lg:mr-20'>
					<h2 className='text-4xl text-center font-bold mb-8'>OUR PRICES</h2>
					<div className='space-y-3'>
						{services.map((service) => (
							<div
								key={service.id}
								className='flex items-center justify-between py-2 border-b border-black/10'
							>
								<span className='text-lg'>{service.name}</span>
								<span className='text-lg font-medium'>{service.price} {service.currency}</span>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default Pricing