"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Menu,
	X,
	Heart,
	User,
	ArrowRight,
} from "lucide-react";
import SearchForm from "./search-form";

export const HeroWithNavbar = () => {
	const controls = useAnimation();
	const [activeCarIndex, setActiveCarIndex] = useState(0);
	const carouselRef = useRef(null);
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0,
	);
	const [isScrolled, setIsScrolled] = useState(false);

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/inventory", label: "Inventory" },
		{ href: "/services", label: "Services" },
		{ href: "/about", label: "About" },
		{ href: "/contact", label: "Contact" },
	];

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
			if (window.innerWidth >= 768 && isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		if (typeof window !== "undefined") {
			window.addEventListener("resize", handleResize);
			window.addEventListener("scroll", handleScroll);
			return () => {
				window.removeEventListener("resize", handleResize);
				window.removeEventListener("scroll", handleScroll);
			};
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
			<nav
				className={`fixed w-full z-50 transition-all duration-300 ${
					isScrolled
						? "bg-gray-50/95 dark:bg-gray-950/95 shadow-md backdrop-blur-md"
						: "bg-transparent"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<Link
							href="/"
							className="flex items-center whitespace-nowrap text-2xl font-black"
						>
							<span className="mr-2 text-4xl text-primary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									role="img"
									width="1em"
									height="1em"
									preserveAspectRatio="xMidYMid meet"
									viewBox="0 0 24 24"
								>
									<path
										fill="currentColor"
										d="M6.925 16.875Q5.2 16.225 4.1 14.713Q3 13.2 3 11.25q0-1.975.938-3.513Q4.875 6.2 6 5.15q1.125-1.05 2.062-1.6L9 3v2.475q0 .625.45 1.062q.45.438 1.075.438q.35 0 .65-.15q.3-.15.5-.425L12 6q.95.55 1.625 1.35t1.025 1.8l-1.675 1.675q-.05-.6-.287-1.175q-.238-.575-.638-1.05q-.35.2-.738.287q-.387.088-.787.088q-1.1 0-1.987-.612Q7.65 7.75 7.25 6.725q-.95.925-1.6 2.062Q5 9.925 5 11.25q0 .775.275 1.462q.275.688.75 1.213q.05-.5.287-.938q.238-.437.588-.787L9 10.1l2.15 2.1q.05.05.1.125t.1.125l-1.425 1.425q-.05-.075-.087-.125q-.038-.05-.088-.1L9 12.925l-.7.7q-.125.125-.212.287q-.088.163-.088.363q0 .3.175.537q.175.238.45.363ZM9 10.1Zm0 0ZM7.4 22L6 20.6L19.6 7L21 8.4L17.4 12H21v2h-5.6l-.5.5l1.5 1.5H21v2h-2.6l2.1 2.1l-1.4 1.4l-2.1-2.1V22h-2v-4.6l-1.5-1.5l-.5.5V22h-2v-3.6Z"
									/>
								</svg>
							</span>
							<span className={`${isScrolled ? "text-foreground" : "text-white"}`}>
								KashiandKarz
							</span>
						</Link>
						<div className="hidden md:flex items-center space-x-8">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`text-sm font-medium hover:text-primary transition-colors ${
										isScrolled ? "text-foreground" : "text-white"
									}`}
								>
									{link.label}
								</Link>
							))}
						</div>
						<div className="hidden md:flex items-center space-x-4">
							<Button
								variant={isScrolled ? "ghost" : "outline"}
								size="icon"
								className={
									!isScrolled ? "text-white border-white hover:bg-white/20" : ""
								}
							>
								<Heart className="h-5 w-5" />
							</Button>
							<Button
								variant={isScrolled ? "default" : "outline"}
								className={
									!isScrolled ? "text-white border-white hover:bg-white/20" : ""
								}
							>
								<User className="h-5 w-5 mr-2" />
								Login
							</Button>
						</div>
						<div className="md:hidden">
							<Button
								variant={isScrolled ? "ghost" : "outline"}
								size="icon"
								onClick={toggleMobileMenu}
								className={
									!isScrolled ? "text-white border-white hover:bg-white/20" : ""
								}
							>
								{isMobileMenuOpen ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6" />
								)}
							</Button>
						</div>
					</div>
				</div>
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="md:hidden bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur-md border-t"
						>
							<div className="px-4 pt-2 pb-3 space-y-1">
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{link.label}
									</Link>
								))}
								<div className="flex items-center space-x-4 pt-4 pb-2">
									<Button variant="ghost" size="icon">
										<Heart className="h-5 w-5" />
									</Button>
									<Button variant="default" className="w-full">
										<User className="h-5 w-5 mr-2" />
										Login
									</Button>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>

			<div className="absolute inset-0 z-0">
				<motion.div
					className="absolute inset-0 z-0 bg-black"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.3 }}
					transition={{ duration: 2 }}
				>
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

			<div className="relative z-20 h-full w-full flex flex-col items-center px-4 sm:px-8 pt-16">
				<div className="flex flex-col md:flex-row w-full h-full mt-8 md:mt-16">
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

					<SearchForm />
				</div>
			</div>
		</div>
	);
};

export default HeroWithNavbar;
