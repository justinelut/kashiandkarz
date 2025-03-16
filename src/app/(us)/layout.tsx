

import { Footer } from "@/components/footer";
import { Header } from "../(home)/components/header";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 overflow-y-auto flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
