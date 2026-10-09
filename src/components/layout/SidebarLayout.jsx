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
import PokemonCard from "@/components/layout/PokemonCard";
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
        <main className="min-w-0 flex-1 bg-muted/30 p-6 md:p-10">
          <div className="w-full max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Minha Pokédex
              </h1>

              <p className="mt-2 text-muted-foreground">
                Explore os Pokémon disponíveis.
              </p>
            </div>

            <PokemonCard pokemon={selectedPokemon} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
