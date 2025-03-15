"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function MobileDealerInfo({
	price,
	isNegotiable,
}: {
	price: string;
	isNegotiable: boolean;
}) {
	return (
		<div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-4 lg:hidden">
			<div className="flex items-center justify-between mb-3">
				<div>
					<div className="text-lg font-bold">{price.replace(/^KSh /, "")}</div>
					{isNegotiable && (
						<Badge variant="outline" className="text-xs">
							Negotiable
						</Badge>
					)}
				</div>
				<Button
					variant="ghost"
					size="sm"
					className="text-xs"
					onClick={() =>
						document
							.getElementById("dealer-info")
							?.scrollIntoView({ behavior: "smooth" })
					}
				>
					View dealer info
				</Button>
			</div>
			<div className="grid grid-cols-2 gap-2">
				<Button className="bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90 font-medium">
					Call now
				</Button>
				<Button className="bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90 font-medium">
					Enquire
				</Button>
			</div>
		</div>
	);
}
