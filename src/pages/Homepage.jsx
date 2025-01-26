import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Menu from '../components/Menu';
import Hero from '../components/Hero';

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
 


  const categories = [
    "All", "Pizza", "Burger", "Sushi", "Indian", "Italian", "Chinese", "Desserts"
  ];

  return (
    <div className="min-h-screen mt-4">
      {/* Hero Section */}
      <Hero/>  

      <Menu/>
    </div>
  );
};

export default Homepage;