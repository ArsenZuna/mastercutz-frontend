import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Gallery from "../components/Gallery.jsx";
import Pricing from "../components/Pricing.jsx";
import Team from "../components/Team.jsx";
import Footer from "../components/Footer.jsx";
import ScrollButton from "../utils/ScrollButton.jsx";
import Chatbot from "../utils/Chatbot.jsx";

const Homepage = () => {
	return (
		<>
			<div className='overflow-hidden bg-black text-white'>
				<Navbar/>
				<Hero/>
				<About/>
				<Gallery/>
				<Pricing/>
				<Team/>
				<Footer/>
				<Chatbot />
				<ScrollButton/>
			</div>
		</>
	)
}

export default Homepage;