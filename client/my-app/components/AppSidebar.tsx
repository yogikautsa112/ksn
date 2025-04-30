import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarFooter,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar className="border-r border-muted bg-muted/20">
      <SidebarHeader className="p-4">
        <h1 className="text-xl font-semibold tracking-tight text-green-700">
          🌿 PasarBogor
        </h1>
        <p className="text-sm text-muted-foreground">Supply Chain Platform</p>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-100 transition">
              🏠 Dashboard
            </button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-100 transition">
              📦 Produk
            </button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-100 transition">
              🛒 Transaksi
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto text-xs text-muted-foreground">
        © 2025 PasarBogor
      </SidebarFooter>
    </Sidebar>
  );
}
