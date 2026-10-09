import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { LayoutGrid, Heart, CircleDot } from "lucide-react";

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      {" "}
      <div className="flex min-h-screen w-full">
        {" "}
        <Sidebar>
          {" "}
          <SidebarHeader>
            {" "}
            <div className="flex items-center gap-2 px-2 py-2">
              {" "}
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {" "}
                <CircleDot size={18} />{" "}
              </div>
              <span className="font-semibold">Pokédex</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu principal</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <LayoutGrid />
                      <span>Explorar Pokémon</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Heart />
                      <span>Favoritos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <p className="px-2 py-2 text-xs text-muted-foreground">
              Minha Pokédex
            </p>
          </SidebarFooter>
        </Sidebar>
        <main className="min-w-0 flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
