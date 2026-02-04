import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MdHome, 
  MdExplore, 
  MdConstruction, 
  MdKeyboardArrowRight,
  MdWarning 
} from 'react-icons/md';
import { FaHouse, FaKey } from 'react-icons/fa6';
import { FaMapMarkedAlt } from "react-icons/fa";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const houseRef = useRef(null);
  const keyRef = useRef(null);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating animation for house and key
  useEffect(() => {
    const animateElements = () => {
      if (houseRef.current) {
        houseRef.current.style.transform = `
          translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)
          rotate(${mousePosition.x * 5}deg)
        `;
      }
      if (keyRef.current) {
        keyRef.current.style.transform = `
          translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px)
          rotate(${mousePosition.x * -8}deg)
        `;
      }
      requestAnimationFrame(animateElements);
    };

    animateElements();
  }, [mousePosition]);

  // Particle effect
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
          delay: Math.random() * 2
        });
      }
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating bubbles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-blue-200/30 rounded-full animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.speed + 3}s`,
              animationDelay: `${particle.delay}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}

        {/* Gradient waves */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            fill="url(#gradient-wave)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="gradient-wave" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)]"
          style={{ 
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, white 40%, transparent 70%)'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number with 3D effect */}
          <div className="mb-8 relative">
            <div 
              className="text-[180px] md:text-[240px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700"
              style={{ 
                textShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              404
            </div>
            
            {/* Floating decorative elements around 404 */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-300/20 rounded-full animate-float-slow" />
            <div className="absolute -bottom-12 right-16 w-12 h-12 bg-indigo-300/20 rounded-full animate-float" />
            <div className="absolute top-16 -right-12 w-20 h-20 bg-purple-300/20 rounded-full animate-float-reverse" />
          </div>

          {/* Animated house and key */}
          <div className="flex justify-center gap-12 mb-12 relative">
            {/* House */}
            <div 
              ref={houseRef}
              className="relative transform transition-all duration-300"
              style={{ willChange: 'transform' }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <FaHouse className="text-white text-4xl" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
            </div>

            {/* Construction sign */}
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <MdConstruction className="text-white text-3xl" />
              </div>
            </div>

            {/* Key */}
            <div 
              ref={keyRef}
              className="relative transform transition-all duration-300"
              style={{ willChange: 'transform' }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <FaKey className="text-white text-4xl" />
              </div>
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce" />
            </div>
          </div>

          {/* Title and message */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Lost Your Way?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            The page you're looking for doesn't exist. 
            Don't worry, we'll help you find your way back home!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-300">
            <Link
              to="/"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                <MdHome className="text-xl" />
                <span>Go to Homepage</span>
                <MdKeyboardArrowRight className="text-xl transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-white opacity-20 animate-shimmer" />
            </Link>

            <Link
              to="/explore"
              className="group relative px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl shadow-md border-2 border-gray-200 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:border-blue-400 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                <MdExplore className="text-xl" />
                <span>Explore Properties</span>
                <MdKeyboardArrowRight className="text-xl transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>

          {/* Helpful links */}
          <div className="animate-fade-in animation-delay-400">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-6 py-3 rounded-xl mb-8">
              <MdWarning className="text-2xl" />
              <span className="font-medium">Page not found</span>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Tip:</span> Check the URL for typos, or use the search bar to find what you're looking for.
              </p>
              
            </div>
          </div>
        </div>
      </div>

      {/* Footer decoration */}
      <div className="relative z-10 py-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200">
          <FaMapMarkedAlt className="text-blue-600" />
          <span className="text-gray-700 font-medium">Back on the map in no time!</span>
        </div>
      </div>
    </div>
  );
}