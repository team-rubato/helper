import type { Metadata } from "next";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Helper",
  description: "소윤이 일 돕기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="p-3 border-b">
              <SidebarTrigger />
            </header>
            <main className="p-3">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
