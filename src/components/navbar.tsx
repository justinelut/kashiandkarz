"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/inventory", label: "Inventory" },
		{ href: "/services", label: "Services" },
		{ href: "/about", label: "About" },
		{ href: "/contact", label: "Contact" },
	];

	return (
		<nav className="fixed w-full z-50 bg-gray-50 dark:bg-gray-950 shadow-md">
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
						<span className="text-foreground">KashiandKarz</span>
					</Link>
					<div className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-sm font-medium hover:text-primary transition-colors"
							>
								{link.label}
							</Link>
						))}
					</div>
					<div className="hidden md:flex items-center space-x-4">
						<Button variant="ghost" size="icon">
							<Heart className="h-5 w-5" />
						</Button>
						<Button variant="default">
							<User className="h-5 w-5 mr-2" />
							Login
						</Button>
					</div>
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
			{isMobileMenuOpen && (
				<div className="md:hidden bg-gray-50 dark:bg-gray-950 border-t">
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
				</div>
			)}
		</nav>
	);
};

export default Navbar;
