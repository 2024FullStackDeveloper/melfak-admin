import Footer from "@/components/core/Footer";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
      <Footer />
    </DashboardLayout>
  );
}
