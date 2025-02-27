"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Search, ArrowRight, Calendar, Car } from "lucide-react";

export const HeroSection = () => {
  const controls = useAnimation();
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  
  // Array of car images with corresponding data
  const cars = [
    { 
      image: "/hero_img1.jpg", 
      name: "Model S", 
      tagline: "Beyond Luxury" 
    },
    { 
      image: "/car1.jpg", 
      name: "Hyperion", 
      tagline: "Redefine Performance" 
    },
    { 
      image: "/car2.jpg", 
      name: "Celestial", 
      tagline: "Future Forward" 
    }
  ];

  // Auto-rotate featured cars with longer intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCarIndex((prev) => (prev + 1) % cars.length);
    }, 8000); // Increased from 5000 to 8000ms
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Animated background with particles effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 z-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 20, // Doubled duration
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Car image with zoom and fade effect - slower transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCarIndex}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1] }} // Doubled from 1.2 to 2.4
          className="absolute inset-0 z-0"
        >
          <Image
            src={cars[activeCarIndex].image}
            alt={`${cars[activeCarIndex].name} car`}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Static dark overlay for consistent text visibility */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>
      
      {/* Permanent gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-5"></div>
      
      {/* Slower diagonal animated overlay */}
      <div className="absolute inset-0 overflow-hidden z-5">
        <motion.div
          className="absolute -inset-full bg-gradient-to-r from-primary/10 to-secondary/10"
          style={{ transform: "rotate(-45deg)" }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 30, // Triple duration from 15 to 30
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear"
          }}
        />
      </div>
      
      {/* Slower moving particle lines */}
      <div className="absolute inset-0 z-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{ top: `${10 + i * 15}%` }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 20 + i * 4, // Doubled from 10 to 20
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Content container with responsive adjustments */}
      <div className="relative z-20 h-full w-full flex flex-col items-center px-4 sm:px-8">
        {/* Brand logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-6 md:mt-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative h-14 w-40 cursor-pointer"
          >
            <div className="bg-gradient-to-r from-primary to-secondary rounded-full h-10 sm:h-12 w-10 sm:w-12 flex items-center justify-center mx-auto">
              <Car size={24} className="text-white" />
            </div>
            <p className="text-white text-center font-bold mt-1 text-lg sm:text-xl tracking-wider">VELOZITY</p>
          </motion.div>
        </motion.div>
        
        {/* Main hero content with responsive layout */}
        <div className="flex flex-col md:flex-row w-full h-full mt-4 md:mt-0">
          {/* Text content area with dedicated semi-transparent background for better readability */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-2 sm:px-4 md:pl-8 lg:pl-16 py-4 md:py-0 relative">
            {/* Semi-transparent backdrop for text content on mobile */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl md:hidden"></div>
            
            {/* Text content with better visibility */}
            <div className="relative z-10 w-full">
              {/* Animated heading with car model changing */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCarIndex}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  transition={{ duration: 1.2 }} // Doubled from 0.6 to 1.2
                  className="mb-4 sm:mb-6"
                >
                  <h2 className="text-white/90 text-base sm:text-xl mb-1 font-medium">Introducing</h2>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      {cars[activeCarIndex].name}
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light">
                    {cars[activeCarIndex].tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.6 }} // Doubled from 0.4/0.8 to 0.8/1.6
                className="max-w-lg mb-6 sm:mb-10"
              >
                <p className="text-gray-200 text-base sm:text-lg font-medium">
                  Experience the pinnacle of automotive engineering with unprecedented performance, 
                  cutting-edge technology, and sustainable luxury.
                </p>
              </motion.div>
              
              {/* CTAs with mobile optimization */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-6 mb-6 sm:mb-10 w-full xs:w-auto">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-full xs:w-auto"
                >
                  <Button className="w-full xs:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium text-base sm:text-lg shadow-lg shadow-primary/20 flex gap-2 items-center justify-center">
                    <span>Order Now</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }} // Doubled from 1.5 to 3
                    >
                      <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </motion.div>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-full xs:w-auto"
                >
                  <Button variant="outline" className="w-full xs:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-medium text-base sm:text-lg flex gap-2 items-center justify-center">
                    <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span>Test Drive</span>
                  </Button>
                </motion.div>
              </div>
              
              {/* Car selector dots */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }} // Doubled from 0.8 to 1.6
                className="flex gap-3 mt-2 sm:mt-4"
              >
                {cars.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-2 rounded-full ${
                      index === activeCarIndex ? "w-6 sm:w-8 bg-primary" : "w-2 bg-white/30"
                    }`}
                    onClick={() => setActiveCarIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
            
          {/* Search and explore section with mobile optimization */}
          <div className="w-full md:w-1/2 flex items-start md:items-center justify-center mt-2 md:mt-0 pb-20 md:pb-0">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.6 }} // Fixed typo from "l.6" to "1.6"
              className="w-full max-w-md px-2 sm:px-0"
            >
              <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 1 }} // Doubled from 0.7/0.5 to 1.4/1
                  className="text-xl sm:text-2xl font-medium text-white mb-4 sm:mb-6"
                >
                  Find Your Perfect Match
                </motion.h3>
                
                <div className="space-y-4 sm:space-y-5">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <Label htmlFor="search" className="text-white/70 mb-1 sm:mb-2 block text-sm font-medium">Search Models</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-white/50 group-hover:text-primary transition-colors duration-200" />
                      <Input 
                        id="search" 
                        placeholder="Type a model or feature..." 
                        className="h-10 sm:h-12 pl-9 sm:pl-10 bg-white/10 border-white/10 rounded-lg sm:rounded-xl text-white focus:ring-primary focus:border-primary transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Label htmlFor="price" className="text-white/70 mb-1 sm:mb-2 block text-sm font-medium">Price Range</Label>
                      <Input 
                        id="price" 
                        placeholder="Any price" 
                        className="h-10 sm:h-12 bg-white/10 border-white/10 rounded-lg sm:rounded-xl text-white focus:ring-primary focus:border-primary transition-all duration-300" 
                      />
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Label htmlFor="type" className="text-white/70 mb-1 sm:mb-2 block text-sm font-medium">Body Style</Label>
                      <Input 
                        id="type" 
                        placeholder="All types" 
                        className="h-10 sm:h-12 bg-white/10 border-white/10 rounded-lg sm:rounded-xl text-white focus:ring-primary focus:border-primary transition-all duration-300" 
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="pt-1 sm:pt-2"
                  >
                    <Button className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-medium shadow-lg shadow-primary/20 text-sm sm:text-base">
                      Discover Available Models
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }} // Doubled from 1 to 2
                    className="flex justify-center mt-1 sm:mt-2"
                  >
                    <span className="text-white/50 text-xs sm:text-sm">Or explore our </span>
                    <span className="text-primary text-xs sm:text-sm font-medium ml-1 cursor-pointer hover:underline">Special Offers</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator with responsive positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2 }} // Doubled from 1.5/1 to 3/2
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity }} // Doubled from 2 to 4
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2">Explore Models</span>
            <div className="bg-white/10 backdrop-blur-lg rounded-full p-1 sm:p-2">
              <ChevronDown className="text-white h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;