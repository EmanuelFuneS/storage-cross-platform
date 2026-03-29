import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <main className="w-full max-w-6xl mx-auto grow flex-1 flex flex-col min-h-0">
        {children}
      </main>
    </body>
  );
}
