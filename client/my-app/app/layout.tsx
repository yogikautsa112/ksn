import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

export const metadata = {
  title: "AgroChainBogor - Manajemen Rantai Pasok Pertanian",
  description:
    "Platform terintegrasi untuk pengelolaan ekspor-impor komoditas pertanian",
  keywords:
    "agro chain, pertanian, ekspor impor, bogor, manajemen rantai pasok",
  authors: [{ name: "AgroChainBogor Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-background font-sans antialiased">
        <SidebarProvider>
          <Theme appearance="light" accentColor="green">
            <div className="flex min-h-screen w-screen overflow-hidden bg-white">
              {/* Sidebar */}
              <AppSidebar />
              {/* Main Content */}
              <main className="flex-1 overflow-auto p-6 bg-background">
                {children}
              </main>
            </div>
          </Theme>
        </SidebarProvider>
      </body>
    </html>
  );
}
