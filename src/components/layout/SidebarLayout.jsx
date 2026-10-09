import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      {" "}
      <div className="flex min-h-screen w-full">
        {" "}
        <Sidebar>
          {" "}
          <SidebarContent>
            {" "}
            <SidebarGroup>
              {" "}
              <SidebarGroupLabel>Minha Pokédex </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Explorar Pokémon</SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton>Pokémon Favoritos</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="min-w-0 flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
