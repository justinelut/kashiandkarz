"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
	ChevronDown,
	Search,
	ArrowRight,
	Calendar,
	ChevronLeft,
	ChevronRight,
	Menu,
	X,
} from "lucide-react";
import SearchForm from "./search-form";

export const HeroSection = () => {
	const controls = useAnimation();
	const [activeCarIndex, setActiveCarIndex] = useState(0);
	const carouselRef = useRef(null);
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0,
	);

	const cars = [
		{
			image:
				"https://images.unsplash.com/photo-1621993202323-f438eec934ff?q=80&w=2000&auto=format&fit=crop",
			name: "Toyota Land Cruiser",
			tagline: "Conquer Any Terrain",
			description:
				"Experience superior off-road capability with Kenya's most trusted SUV. Perfect for safaris and rugged terrain.",
		},
		{
			image:
				"https://images.unsplash.com/photo-1687292625389-664f8c39586b?q=80&w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGN4NXxlbnwwfHwwfHx8MA%3D%3D",
			name: "Mazda CX-5",
			tagline: "Elegance Meets Performance",
			description:
				"Designed for the sophisticated urban driver, combining luxury with fuel efficiency for Nairobi's busy streets.",
		},
		{
			image:
				"https://images.unsplash.com/photo-1687048988997-ec57f83ea3bd?q=80&w=2000&auto=format&fit=crop",
			name: "Subaru Forester",
			tagline: "Built for Kenyan Roads",
			description:
				"All-wheel drive reliability that handles everything from city commutes to upcountry adventures with ease.",
		},
	];

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
			// Close mobile menu on resize to larger screen
			if (window.innerWidth >= 768 && isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}
	}, [isMobileMenuOpen]);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveCarIndex((prev) => (prev + 1) % cars.length);
		}, 8000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		controls.start("visible");
	}, [controls]);

	const minSwipeDistance = 50;
	const onTouchStart = (e) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
		if (isLeftSwipe) {
			nextCar();
		} else if (isRightSwipe) {
			prevCar();
		}
	};

	const nextCar = () => {
		setActiveCarIndex((prev) => (prev + 1) % cars.length);
	};

	const prevCar = () => {
		setActiveCarIndex((prev) => (prev - 1 + cars.length) % cars.length);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<div
			className="relative h-screen w-full overflow-hidden bg-black"
			ref={carouselRef}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			{/* Mobile Navigation Menu Button */}
			<div className="absolute top-4 right-4 z-30 md:hidden">
				<button
					className="p-2 rounded-full bg-black/50 backdrop-blur-md"
					onClick={toggleMobileMenu}
				>
					{isMobileMenuOpen ? (
						<X className="h-6 w-6 text-white" />
					) : (
						<Menu className="h-6 w-6 text-white" />
					)}
				</button>
			</div>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="fixed inset-0 z-20 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center"
					>
						<div className="space-y-6 text-center">
							<a
								href="#"
								className="block text-white text-2xl font-medium hover:text-primary"
							>
								Home
							</a>
							<a
								href="#"
								className="block text-white text-2xl font-medium hover:text-primary"
							>
								Vehicles
							</a>
							<a
								href="#"
								className="block text-white text-2xl font-medium hover:text-primary"
							>
								Services
							</a>
							<a
								href="#"
								className="block text-white text-2xl font-medium hover:text-primary"
							>
								About
							</a>
							<a
								href="#"
								className="block text-white text-2xl font-medium hover:text-primary"
							>
								Contact
							</a>
							<Button className="mt-6 w-48 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white">
								Sign In
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="absolute inset-0 z-0">
				<motion.div
					className="absolute inset-0 z-0 bg-black"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.3 }}
					transition={{ duration: 2 }}
				>
					{/* Responsive particle effects - fewer on mobile */}
					{[...Array(windowWidth < 768 ? 10 : 20)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full bg-primary/20"
							style={{
								width: Math.random() * (windowWidth < 768 ? 4 : 6) + 2,
								height: Math.random() * (windowWidth < 768 ? 4 : 6) + 2,
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
							}}
							animate={{
								y: [0, Math.random() * -100],
								opacity: [0, 0.5, 0],
							}}
							transition={{
								duration: Math.random() * 20 + 20,
								repeat: Infinity,
								repeatType: "loop",
							}}
						/>
					))}
				</motion.div>
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={activeCarIndex}
					initial={{ scale: 1.1, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.95, opacity: 0 }}
					transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
					className="absolute inset-0 z-0"
				>
					<Image
						src={cars[activeCarIndex].image}
						alt={`${cars[activeCarIndex].name} car`}
						fill
						className="object-cover"
						quality={90}
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
						priority
					/>
				</motion.div>
			</AnimatePresence>

			{/* Background overlays */}
			<div className="absolute inset-0 bg-black/50 z-5"></div>
			<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-5"></div>
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-5"></div>

			<div className="absolute inset-0 overflow-hidden z-5">
				<motion.div
					className="absolute -inset-full bg-gradient-to-r from-primary/10 to-secondary/10"
					style={{ transform: "rotate(-45deg)" }}
					animate={{
						x: ["-100%", "100%"],
					}}
					transition={{
						duration: 30,
						repeat: Infinity,
						repeatType: "mirror",
						ease: "linear",
					}}
				/>
			</div>

			{/* Responsive decorative lines - fewer on mobile */}
			<div className="absolute inset-0 z-5">
				{[...Array(windowWidth < 768 ? 3 : 6)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
						style={{ top: `${windowWidth < 768 ? 15 + i * 25 : 10 + i * 15}%` }}
						animate={{
							x: ["-100%", "100%"],
						}}
						transition={{
							duration: 20 + i * 4,
							repeat: Infinity,
							repeatType: "loop",
							ease: "linear",
							delay: i * 0.5,
						}}
					/>
				))}
			</div>

			{/* Desktop/Tablet Navigation - Hidden on Mobile */}
			{/* <div className="hidden md:block absolute top-0 left-0 right-0 z-10 px-6 lg:px-12 py-4">
				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-8">
						<a
							href="#"
							className="text-white font-medium hover:text-primary transition-colors"
						>
							Vehicles
						</a>
						<a
							href="#"
							className="text-white font-medium hover:text-primary transition-colors"
						>
							Services
						</a>
						<a
							href="#"
							className="text-white font-medium hover:text-primary transition-colors"
						>
							About
						</a>
						<Button className="h-10 px-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white">
							Sign In
						</Button>
					</div>
				</div>
			</div> */}

			{/* Carousel Navigation Arrows - Responsive positioning */}
			<div className="absolute inset-0 z-10 pointer-events-none">
				<div className="h-full flex items-center justify-between">
					<motion.button
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.6, duration: 1 }}
						className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center ml-2 sm:ml-4 pointer-events-auto"
						onClick={prevCar}
					>
						<ChevronLeft className="text-white/70 h-5 w-5 sm:h-6 sm:w-6" />
					</motion.button>
					<motion.button
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.6, duration: 1 }}
						className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center mr-2 sm:mr-4 pointer-events-auto"
						onClick={nextCar}
					>
						<ChevronRight className="text-white/70 h-5 w-5 sm:h-6 sm:w-6" />
					</motion.button>
				</div>
			</div>

			<div className="relative z-20 h-full w-full flex flex-col items-center px-4 sm:px-8">
				<motion.div
					initial={{ y: -50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="mt-16 md:mt-20"
				>
					<motion.div
						whileHover={{ scale: 1.05 }}
						transition={{ type: "spring", stiffness: 400, damping: 10 }}
						className="relative cursor-pointer"
					></motion.div>
				</motion.div>

				{/* Main content section - Responsive layout */}
				<div className="flex flex-col md:flex-row w-full h-full mt-4 md:mt-8">
					{/* Left Content - Text section */}
					<div className="w-full md:w-1/2 flex flex-col justify-center items-start px-2 sm:px-4 md:pl-8 lg:pl-16 py-4 md:py-0 relative">
						<div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl md:hidden"></div>
						<div className="relative z-10 w-full">
							<AnimatePresence mode="wait">
								<motion.div
									key={activeCarIndex}
									initial={{ x: -40, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: 40, opacity: 0 }}
									transition={{ duration: 1.2 }}
									className="mb-4 sm:mb-6"
								>
									<h2 className="text-white/90 text-base sm:text-lg lg:text-xl mb-1 font-medium">
										Most searched:
									</h2>
									<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-3">
										<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
											{cars[activeCarIndex].name}
										</span>
									</h1>
									<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light">
										{cars[activeCarIndex].tagline}
									</p>
								</motion.div>
							</AnimatePresence>

							<AnimatePresence mode="wait">
								<motion.div
									key={activeCarIndex}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ delay: 0.8, duration: 1.6 }}
									className="max-w-lg mb-4 sm:mb-6 lg:mb-10"
								>
									<p className="text-gray-200 text-sm sm:text-base lg:text-lg font-medium">
										{cars[activeCarIndex].description}
									</p>
								</motion.div>
							</AnimatePresence>

							<div className="flex flex-col xs:flex-row gap-3 sm:gap-6 mb-4 sm:mb-6 lg:mb-10 w-full xs:w-auto">
								<motion.div
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
									transition={{ type: "spring", stiffness: 400, damping: 10 }}
									className="w-full xs:w-auto"
								>
									<Button className="w-full xs:w-auto h-10 sm:h-12 lg:h-14 px-4 sm:px-6 lg:px-8 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium text-sm sm:text-base lg:text-lg shadow-lg shadow-primary/20 flex gap-2 items-center justify-center">
										<span>Book Viewing</span>
										<motion.div
											animate={{ x: [0, 5, 0] }}
											transition={{ duration: 3, repeat: Infinity }}
										>
											<ArrowRight size={16} className="h-4 w-4 sm:w-[18px] sm:h-[18px]" />
										</motion.div>
									</Button>
								</motion.div>
							</div>

							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.6, duration: 1 }}
								className="flex gap-2 sm:gap-3 mt-2 sm:mt-4"
							>
								{cars.map((_, index) => (
									<motion.button
										key={index}
										className={`h-1.5 sm:h-2 rounded-full ${
											index === activeCarIndex
												? "w-4 sm:w-6 lg:w-8 bg-primary"
												: "w-1.5 sm:w-2 bg-white/30"
										}`}
										onClick={() => setActiveCarIndex(index)}
										whileHover={{ scale: 1.2 }}
										transition={{ duration: 0.2 }}
									/>
								))}
							</motion.div>
						</div>
					</div>

					{/* Right Content - Form section */}
					<SearchForm />
				</div>

				{/* Bottom scroll indicator - Responsive positioning */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 3, duration: 2 }}
					className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
				></motion.div>
			</div>
		</div>
	);
};

export default HeroSection;
