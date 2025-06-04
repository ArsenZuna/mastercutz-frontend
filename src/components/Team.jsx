import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import API from "../api/api.jsx";
import { Instagram, ArrowLeft, ArrowRight } from 'lucide-react';

const Team = () => {
	const [barbers, setBarbers] = useState([]);
	const [startIndex, setStartIndex] = useState(0);
	const [visibleCount, setVisibleCount] = useState(5);

	useEffect(() => {
		const fetchBarbers = async () => {
			try {
				const response = await API.get('/api/barbers/public');
				setBarbers(response.data);
			} catch (error) {
				console.log("ERROR", error);
				alert("ERROR");
			}
		};

		fetchBarbers();
	}, []);

	// Adjust visibleCount based on screen width
	useEffect(() => {
		const updateVisibleCount = () => {
			const width = window.innerWidth;
			if (width < 640) {
				setVisibleCount(1);
			} else if (width >= 640 && width < 768) {
				setVisibleCount(2);
			} else if (width >= 768 && width < 1024) {
				setVisibleCount(3);
			} else if (width >= 1024 && width < 1280) {
				setVisibleCount(4);
			} else {
				setVisibleCount(5);
			}
		};

		updateVisibleCount();
		window.addEventListener('resize', updateVisibleCount);
		return () => window.removeEventListener('resize', updateVisibleCount);
	}, []);

	const handleNext = () => {
		if (startIndex + visibleCount < barbers.length) {
			setStartIndex(prev => prev + 1);
		}
	};

	const handlePrev = () => {
		if (startIndex > 0) {
			setStartIndex(prev => prev - 1);
		}
	};

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.3
			}
		}
	}

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: -50
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: "easeOut"
			}
		}
	}

	return (
		<div className="py-6 relative">
			<div className="w-full mx-auto">
				<section>
					<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
						<div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
							<h2 className="mb-4 text-4xl font-bold">MEET THE TEAM</h2>
							<p className="font-light text-white/50 sm:text-xl">
								The best barbers in town that will give you the greatest care and experience in our studios.
							</p>
						</div>
						<div className="relative flex items-center justify-center">
							<button
								onClick={handlePrev}
								className={`p-2 ${startIndex === 0 ? 'invisible' : 'visible'}`}
							>
								<div className='text-3xl text-gray-400 hover:text-white hover:m-2 transition-all duration-300'>
									<ArrowLeft />
								</div>
							</button>
							<motion.div
								className="overflow-hidden w-full"
								variants={containerVariants}
								initial="hidden"
								animate="visible"
								key={barbers.length}
								style={{
									display: 'grid',
									gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
									gap: '2rem'
								}}
							>
								{barbers.slice(startIndex, startIndex + visibleCount).map((barber, index) => (
									<motion.div
										className="text-center text-white/50"
										key={barber.id || index}
										variants={itemVariants}
									>
										<img
											className="mx-auto mb-4 w-36 h-36 rounded-full object-cover hover:shadow-2xl transition-shadow duration-300"
											src={barber.image}
											alt={barber.name}
										/>
										<h3 className="mb-1 text-2xl font-bold text-white/80">
											{barber.name}
										</h3>
										<p>{barber.role}</p>
										<ul className="flex justify-center mt-4 space-x-4">
											<li>
												<a
													href={barber.social}
													target="_blank"
													rel="noopener noreferrer"
													className="text-[#39569c] hover:text-white/70 transition-colors duration-300"
												>
													<Instagram size={21}/>
												</a>
											</li>
										</ul>
									</motion.div>
								))}
							</motion.div>

							<button
								onClick={handleNext}
								className={`p-2 ${startIndex + visibleCount >= barbers.length ? 'invisible' : 'visible'}`}
							>
								<div className='text-3xl text-gray-400 hover:text-white hover:m-2 transition-all duration-300'>
									<ArrowRight />
								</div>
							</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Team;
