import React, { useState } from 'react';
import {motion} from 'framer-motion';
import {fadeIn} from '../utils/variants.jsx';
import firstGalleryImage from '../../public/assets/firstGalleryImage.jpg';
import secondGalleryImage from '../../public/assets/secondGalleryImage.jpg';
import thirdGalleryImage from '../../public/assets/thirdGalleryImage.jpg';
import fourthGalleryImage from '../../public/assets/fourthGalleryImage.jpg';
import fifthGalleryImage from '../../public/assets/fifthGalleryImage.jpg';
import sixthGalleryImage from '../../public/assets/sixthGalleryImage.jpg';

const galleryImages = [
	{
		src: firstGalleryImage,
		alt: "First Image",
		thumbnail: firstGalleryImage,
	},
	{
		src: sixthGalleryImage,
		alt: "Sixth Image",
		thumbnail: sixthGalleryImage,
	},
	{
		src: secondGalleryImage,
		alt: "Second Image",
		thumbnail: secondGalleryImage,
	},
	{
		src: thirdGalleryImage,
		alt: "Third Image",
		thumbnail: thirdGalleryImage,
	},
	{
		src: fifthGalleryImage,
		alt: "Fifth Image",
		thumbnail: fifthGalleryImage,
	},
	{
		src: fourthGalleryImage,
		alt: "Fourth Image",
		thumbnail: fourthGalleryImage,
	},
];

const Gallery = () => {
	const [selectedImage, setSelectedImage] = useState(0);

	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='text-center mb-12'>
				<h2 className='text-4xl font-bold mb-4'>GALLERY</h2>
				<p className='text-gray-600'>
					Explore the essence of beauty in our gallery's intimate space.
				</p>
			</div>

			<div className='flex flex-col lg:flex-row gap-5 max-w-6xl mx-auto'>
				{/* Main Image */}
				<motion.div
					variants={fadeIn('right')}
					initial='hidden'
					whileInView='show'
					viewport={{ once: true, amount: 0.3 }}
					className='flex-grow rounded-lg overflow-hidden'>
					<img
						src={galleryImages[selectedImage].src}
						alt={galleryImages[selectedImage].alt}
						className='w-full h-[500px] lg:h-[700px] object-cover rounded-lg'
						loading='eager'
					/>
				</motion.div>

				{/* Thumbnails */}
				<motion.div
					variants={fadeIn('left')}
					initial='hidden'
					whileInView='show'
					viewport={{ once: true, amount: 0.3 }}
					className='flex flex-row lg:flex-col justify-center items-center align-middle gap-3'>
					{galleryImages.map((image, index) => (
						<button
							key={index}
							onClick={() => setSelectedImage(index)}
							className={`w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden ${
								selectedImage === index
									? 'ring-2 ring-offset-2 ring-neutral-800'
									: 'opacity-70 hover:opacity-100 transition-opacity'
							}`}
						>
							<img
								src={image.thumbnail}
								alt={`Thumbnail ${index + 1}`}
								className='w-full h-full object-cover'
								loading='lazy'
							/>
						</button>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default Gallery;
