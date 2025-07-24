import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import InitializeAuth from "../components/InitializeAuth";
import { QueryProvider } from "../components/QueryProvider";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <InitializeAuth />
      <QueryProvider>{children}</QueryProvider>
      <Toaster />
    </SidebarProvider>
  );
}
