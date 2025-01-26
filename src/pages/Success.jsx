import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../cart/cartSlice';
import { CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Success = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const containerRef = useRef(null);
    const messageRef = useRef(null);
    const animationsRef = useRef(null);
    const buttonsRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Message animation
            gsap.from(messageRef.current, {
                y: 100,
                duration: 1,
                ease: "power2.out"
            });

            // Animations container
            gsap.from(animationsRef.current.children, {
                scale: 0.5,
                duration: 1,
                stagger: 0.2,
                ease: "back.out(1.7)"
            });

            // Status messages
            gsap.from(".status-message", {
                x: -100,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });

            // Buttons
            gsap.from(buttonsRef.current.children, {
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, containerRef);

        dispatch(clearCart());

        return () => {
            ctx.revert();
            // Kill any remaining ScrollTrigger instances
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-white py-12 px-4" ref={containerRef}>
            <div className="max-w-7xl mx-auto ">
                {/* Success Message Section */}
                <div ref={messageRef} className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-3 animate-pulse">
                        Woohoo! Order Confirmed 🎉
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                        Time to get cooking! (Not you, our chef 😉)
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col  items-center justify-between gap-8 sm:gap-4">
                    {/* Left Side - Animations */}
                    <div ref={animationsRef} className="relative flex-1 flex justify-center ">
                        {/* Chef Animation */}
                        <div className="relative">
                            <DotLottieReact
                                src="https://lottie.host/558e0244-612a-416a-86f0-e1525a34a687/9e1xgQZI4I.lottie"
                                loop
                                autoplay
                                className="w-72 sm:w-96 h-72 sm:h-96"
                            />
                            <div className="absolute  -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                                {"Leave it to the pro! 👨‍🍳"}
                            </div>
                            
                            {/* Pizza Animation - Smaller and Positioned */}
                            <div className="absolute -right-8 bottom-0">
                                <DotLottieReact
                                    src="https://lottie.host/8649566b-2d4d-4e01-b4f0-8bdfbc13a734/OnlmgGcqLC.lottie"
                                    loop
                                    autoplay
                                    className="w-32 sm:w-48 h-32 sm:h-48"
                                />
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full shadow-lg text-sm transform hover:scale-105 transition-transform">
                                    "Coming right up! 🍕"
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Status and Actions */}
                    <div className="w-full sm:w-96 flex-shrink-0">
                        {/* Fun Status Messages */}
                        <div className="text-center sm:text-left mb-8 space-y-3">
                            <p className="status-message text-green-600 font-medium flex items-center gap-2 justify-center sm:justify-start">
                                <span className="inline-block animate-spin">✨</span>
                                Order received
                            </p>
                            <p className="status-message text-orange-500 font-medium flex items-center gap-2 justify-center sm:justify-start">
                                <span className="inline-block animate-bounce">👨‍🍳</span>
                                Chef is working their magic
                            </p>
                            <p className="status-message text-gray-400 font-medium flex items-center gap-2 justify-center sm:justify-start">
                                <span className="inline-block animate-pulse">🚀</span>
                                Your delicious meal is on its way
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div ref={buttonsRef} className="flex flex-col gap-4">
                            <Link
                                to="/orderhistory"
                                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                                    Track Your Order
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            </Link>
                            
                            <Link
                                to="/"
                                className="group relative px-8 py-4 bg-white text-gray-700 rounded-xl transition-all shadow-lg hover:shadow-xl border border-gray-200 text-center overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 font-medium group-hover:text-orange-500">
                                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                                    Order More Goodies
                                </span>
                                <div className="absolute inset-0 bg-gray-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success;
