import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 overflow-y-auto">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
