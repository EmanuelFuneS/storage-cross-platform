import LayoutDashboard from "./_components/Layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="w-full min-w-full">
      <LayoutDashboard>{children}</LayoutDashboard>
    </body>
  );
}
