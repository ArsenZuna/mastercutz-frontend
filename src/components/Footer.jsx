import React from 'react';
import { MapPin, Phone, Send } from 'lucide-react'
import {motion} from 'framer-motion';
import {fadeIn} from '../utils/variants.jsx';

const Footer = () => {

	const staggerContainer = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.2,
			},
		},
	};

	return (
		<>
			<footer className="bg-black/90 text-white py-16">
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					animate="show"
					className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<motion.div
						variants={fadeIn('up')}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true, amount: 0.3 }}
						className="space-y-6 ml-1 lg:ml-10">
						<h2 className="text-lg font-semibold">MASTERCUTZ</h2>
						<div className="space-y-4">
							<div className="flex items-center gap-3 text-sm">
								<MapPin size={18} />
								<span>John Doe Street, Lorem, Ipsum</span>
							</div>
							<div className="flex items-center gap-3 text-sm">
								<Phone size={18} />
								<span>+000 00 00 00 000</span>
							</div>
							<div className="flex items-center gap-3 text-sm">
								<MapPin size={18} />
								<span>Simon Doe Street, Lorem, Ipsum</span>
							</div>
							<div className="flex items-center gap-3 text-sm">
								<Phone size={18} />
								<span>+000 00 00 00 000</span>
							</div>
						</div>
					</motion.div>

					{/* Working Time Column */}
					<motion.div
						variants={fadeIn('up')}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true, amount: 0.3 }}
						className="space-y-3 ml-1 lg:ml-20">
						<h2 className="text-lg font-semibold mb-4">WORKING TIME</h2>
						<ul className="space-y-4 text-gray-300 text-sm">
							<li>MAKE APPOINTMENTS</li>
							<li>Mon - Fri / 09:00 - 20:00</li>
							<li>Saturday / 10:00 - 20:00</li>
							<li>Sunday / CLOSED</li>
						</ul>
					</motion.div>

					{/* Newsletter Column */}
					<motion.div
						variants={fadeIn('up')}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true, amount: 0.3 }}
						className="space-y-4 ml-1">
						<h2 className="text-lg font-semibold mb-4">NEWSLETTER</h2>
						<p className="text-gray-300 text-sm mb-4">
							Elit duis porttitor massa tellus nun in velit arcu posuere integer.
						</p>
						<div className="relative">
							<input
								type="email"
								placeholder="Your Email Address"
								className="w-full bg-transparent border-b border-gray-600 py-2 pr-10 text-sm focus:outline-none focus:border-white transition-colors"
							/>
							<button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
								<Send size={18} />
							</button>
						</div>
					</motion.div>
				</motion.div>

				{/* Copyright */}
				<div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/50">
					<p className="text-gray-400 text-sm">
						© 2025 MASTERCUTZ. All rights reserved.
					</p>
				</div>
			</footer>
		</>
	)
};

export default Footer;