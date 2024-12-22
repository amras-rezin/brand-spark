import {motion} from 'framer-motion';
import "./Clients.css";
import { useState } from 'react';

const Clients = () => {
  const slides = [
    { id: 1, image: '/icons/1.png', caption: 'Slide 1' },
    { id: 2, image: '/icons/3.png', caption: 'Slide 2' },
    { id: 3, image: '/icons/4.png', caption: 'Slide 3' },
    { id: 4, image: '/icons/5.png', caption: 'Slide 4' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };


  return (
    <>
    <motion.div
      className="main-client flex justify-center items-center flex-col gap-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
    >
      {/* Top Row */}
      <div className="top-row">
        {[...Array(10)].map((_, i) => (
          <img
            key={`top-${i}`}
            className="client-icon"
            src={`/icons/${i + 1}.png`}
            alt={`client-${i + 1}`}
          />
        ))}
        {/* Duplicate the icons for seamless loop */}
        {[...Array(10)].map((_, i) => (
          <img
            key={`top-dup-${i}`}
            className="client-icon"
            src={`/icons/${i + 1}.png`}
            alt={`client-dup-${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom Row */}
      <div className="bottom-row">
        {[...Array(10)].map((_, i) => (
          <img
            key={`bottom-${i}`}
            className="client-icon"
            src={`/icons/${10 - i}.png`}
            alt={`client-${10 - i}`}
          />
        ))}
        {/* Duplicate the icons for seamless loop */}
        {[...Array(10)].map((_, i) => (
          <img
            key={`bottom-dup-${i}`}
            className="client-icon"
            src={`/icons/${10 - i}.png`}
            alt={`client-dup-${10 - i}`}
          />
        ))}
      </div>
    </motion.div>
 
  
    <div className="relative w-full max-w-screen-lg mx-auto">
      <div className="relative overflow-hidden">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].caption}
          className="w-full h-auto object-cover"
        />
        <div className="absolute bottom-5 left-5 text-white text-2xl bg-black bg-opacity-50 px-4 py-2 rounded-lg">
          {slides[currentSlide].caption}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-4xl bg-black bg-opacity-50 px-4 py-2 rounded-full"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-4xl bg-black bg-opacity-50 px-4 py-2 rounded-full"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
 </>

  );
};

export default Clients;


