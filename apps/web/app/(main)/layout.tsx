import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <Navbar />
      <main className="w-full max-w-6xl mx-auto flex flex-col">{children}</main>
      <Footer />
    </body>
  );
}
