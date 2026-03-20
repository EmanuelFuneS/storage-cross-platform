import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col min-h-0">{children}</main>
      <Footer />
    </>
  );
}
