import { useState } from "react";
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

import { usePokemons } from "@/hooks/usePokemons";

export default function SidebarLayout() {
  const { pokemons, loading, error } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex size-8 items-center justify-center rounded-lg text-primary-foreground">
                <div className="flex size-8 items-center justify-center rounded-lg">
                  <img
                    src="/pokeball.png"
                    alt="Pokébola"
                    className="size-7 object-contain"
                  />
                </div>
              </div>
              <span className="font-semibold">Pokédex</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Pokémon</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {loading && (
                    <p className="px-3 py-2 text-sm text-muted-foreground">
                      Carregando pokémon...
                    </p>
                  )}

                  {error && (
                    <p className="px-3 py-2 text-sm text-destructive">
                      {error}
                    </p>
                  )}

                  {pokemons.map((pokemon) => (
                    <SidebarMenuItem key={pokemon.id}>
                      <SidebarMenuButton
                        isActive={selectedPokemon?.id === pokemon.id}
                        onClick={() => setSelectedPokemon(pokemon)}
                      >
                        <span className="w-8 shrink-0 text-xs text-muted-foreground">
                          {String(pokemon.id).padStart(3, "0")}
                        </span>

                        <span className="truncate capitalize">
                          {pokemon.name}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
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

        <main className="min-w-0 flex-1 p-8">
          {selectedPokemon ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Nº {String(selectedPokemon.id).padStart(3, "0")}
              </p>

              <img
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                className="size-48 object-contain"
              />

              <h1 className="text-3xl font-bold capitalize">
                {selectedPokemon.name}
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold">Minha Pokédex</h1>

              <p className="mt-2 text-muted-foreground">
                Selecione um Pokémon no menu lateral.
              </p>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
