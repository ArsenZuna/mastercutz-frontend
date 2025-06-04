import React, { useState, useEffect } from 'react';

const ScrollButton = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-4 left-4 bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-600 hover:text-white transition-opacity duration-300 ${
				visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
			aria-label="Scroll to top"
		>
			↑
		</button>
	);
};

export default ScrollButton;