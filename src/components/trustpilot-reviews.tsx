"use client";
import { Star, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
	{
		title: "They're Really good with working",
		content: "They're Really good with working with customers 🙌",
		author: "kenny Dorcas",
		time: "12 hours ago",
	},
	{
		title: "Very good service",
		content:
			"Very good service. Did exactly what they said they would do. No issues.",
		author: "MR MICHAEL MARTIN",
		time: "12 hours ago",
	},
	{
		title: "Excellent service",
		content: "I had a smooth experience with Kashi. Highly recommend",
		author: "Heber",
		time: "14 hours ago",
	},
	{
		title: "Its all in the name...Wow!",
		content:
			"Very easy system to use and updated throughout the sale. Managed to get great bids fo...",
		author: "Wayne Mackay",
		time: "14 hours ago",
	},
	{
		title: "Start to finish hassle free way to",
		content:
			"Start to finish hassle free way to sell car ,got good price trouble free process from...",
		author: "Chris",
		time: "14 hours ago",
	},
];

export function TrustpilotReviews() {
	return (
		<section className="bg-gray-100 py-12">
			<div className="container px-4 md:px-6">
				<div className="mb-8 flex items-center gap-3">
					<Star className="h-10 w-10 fill-black text-black" />
					<div>
						<h2 className="text-2xl font-bold">This is how it should feel</h2>
						<p className="text-gray-600">
							Our customers rate us as{" "}
							<span className="font-medium">{"'Excellent'"}</span> on Trustpilot
						</p>
					</div>
				</div>
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent>
						{reviews.map((review, index) => (
							<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
								<Card className="border border-gray-200">
									<CardContent className="p-4">
										<div className="mb-2 flex items-center justify-between">
											<div className="flex">
												{Array(5)
													.fill(null)
													.map((_, i) => (
														<Star key={i} className="h-5 w-5 fill-gray-800 text-gray-800" />
													))}
											</div>
											<div className="flex items-center gap-1 text-xs text-gray-500">
												<BadgeCheck className="h-4 w-4" />
												Verified
											</div>
										</div>
										<h3 className="mb-2 font-semibold">{review.title}</h3>
										<p className="mb-4 text-sm text-gray-600">{review.content}</p>
										<div className="flex items-center justify-between text-xs text-gray-500">
											<span>{review.author}</span>
											<span>{review.time}</span>
										</div>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="absolute -left-4 top-1/2 z-10 bg-white border border-gray-200 hover:bg-gray-100" />
					<CarouselNext className="absolute -right-4 top-1/2 z-10 bg-white border border-gray-200 hover:bg-gray-100" />
				</Carousel>
				<div className="mt-6 flex flex-col items-center gap-2">
					<p className="text-sm text-gray-600">
						Rated 4.5 / 5 based on 66,186 reviews. Showing our 5 star reviews.
					</p>
					<div className="flex items-center gap-2">
						<Star className="h-5 w-5 fill-black text-black" />
						<span className="font-semibold">Trustpilot</span>
					</div>
				</div>
			</div>
		</section>
	);
}
