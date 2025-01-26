import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Hero = () => {

    const heroRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const slides = [
      {
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        title: "Delicious Food",
        subtitle: "Delivered to You"
      },
      {
        image: "https://images.unsplash.com/photo-1543353071-087092ec393a",
        title: "Fresh & Healthy",
        subtitle: "Quality Ingredients"
      },
      {
        image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d",
        title: "Quick Delivery",
        subtitle: "At Your Doorstep"
      }
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds
  
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      // Slide animation
      gsap.fromTo(
        `.slide-${currentSlide}`,
        {
          opacity: 0,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );
    }, [currentSlide]);
  
    useEffect(() => {
      // Hero section animation
      gsap.fromTo(heroRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out"
        }
      );
  
   
    }, []);


  return (
    <section ref={heroRef} className="relative h-[500px] overflow-hidden ">
    {slides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-red-600/30 z-10 rounded-2xl" />
        <div className={`absolute inset-0 rounded-2xl slide-${index}`}>
          <img
            src={slide.image}
            alt={`Food Banner ${index + 1}`}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {slide.title}
              <br />
              {slide.subtitle}
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Choose from a wide variety of cuisines and enjoy your favorite meals delivered right to your doorstep.
            </p>
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </div>
    ))}

    {/* Slide Indicators */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentSlide 
              ? 'bg-orange-400 w-4' 
              : 'bg-white/60 hover:bg-orange-400/95'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>

    {/* Navigation Arrows */}
    <button
      onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
      className="absolute left-4 bottom-0 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all"
      aria-label="Previous slide"
    >
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
      className="absolute right-4 bottom-0 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all"
      aria-label="Next slide"
    >
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </section>
  )
}

export default Hero