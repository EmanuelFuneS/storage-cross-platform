import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import LayoutAdmin from "./_components/Layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="w-full">
      <LayoutAdmin>{children}</LayoutAdmin>
    </body>
  );
}
