import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const SearchForm = () => {
	return (
		<div className="w-full md:w-1/2 flex items-center justify-center mt-2 md:mt-0 md:pt-16 pb-16 md:pb-0">
			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 1.2, duration: 1.6 }}
				className="w-full max-w-md px-4 pb-16 sm:pb-0 sm:max-w-lg md:max-w-2xl lg:max-w-3xl"
			>
				<div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-xl">
					<div className="space-y-3 sm:space-y-4 lg:space-y-5">
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="group"
						>
							<Label
								htmlFor="search"
								className="text-white/70 mb-1 sm:mb-2 block text-xs sm:text-sm font-medium"
							>
								Search Models
							</Label>
							<div className="relative">
								<Search className="absolute left-2 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white/50 group-hover:text-primary transition-colors duration-200" />
								<Input
									id="search"
									placeholder="Toyota, Mazda, Subaru..."
									className="h-8 sm:h-10 lg:h-12 text-xs sm:text-sm pl-7 sm:pl-9 lg:pl-10 bg-white/10 border-white/10 rounded-lg sm:rounded-xl text-white focus:ring-primary focus:border-primary transition-all duration-300"
								/>
							</div>
						</motion.div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
							<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
								<Label
									htmlFor="price"
									className="text-white/70 mb-1 sm:mb-2 block text-xs sm:text-sm font-medium"
								>
									Price Range
								</Label>
								<Input
									id="price"
									placeholder="KSh 500K - 5M"
									className="h-8 sm:h-10 lg:h-12 text-xs sm:text-sm bg-white/10 border-white/10 rounded-lg sm:rounded-xl text-white focus:ring-primary focus:border-primary transition-all duration-300"
								/>
							</motion.div>
							<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
								<Label
									htmlFor="type"
									className="text-white/70 mb-1 sm:mb-2 block text-xs sm:text-sm font-medium"
								>
									Body Style
								</Label>
								<Input
									id="type"
									placeholder="SUV, Sedan, Pickup..."
									className="h-8 sm:h-10 lg:h-12 text-xs sm:text-sm bg-white/10 border-white/10 rounded-lg sm:rounded-xl text-white focus:ring-primary focus:border-primary transition-all duration-300"
								/>
							</motion.div>
						</div>
						<motion.div
							whileHover={{ scale: 1.03, y: -2 }}
							whileTap={{ scale: 0.97 }}
							className="pt-1 sm:pt-2"
						>
							<Button className="w-full h-8 sm:h-10 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-medium shadow-lg shadow-primary/20 text-xs sm:text-sm lg:text-base">
								Find Available Vehicles
							</Button>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 2, duration: 1 }}
							className="flex justify-center mt-1 sm:mt-2"
						>
							<span className="text-white/50 text-xs sm:text-sm">Or browse our </span>
							<span className="text-primary text-xs sm:text-sm font-medium ml-1 cursor-pointer hover:underline">
								Import Services
							</span>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default SearchForm;
