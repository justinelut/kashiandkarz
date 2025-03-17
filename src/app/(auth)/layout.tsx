import { Footer } from "@/components/footer";
import { Header } from "../(home)/components/header";


export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<main className="flex-1 overflow-y-auto flex flex-col">
			
			{children}
		
		</main>
	);
}
