import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PokemonCard({ pokemon }) {
  if (!pokemon) {
    return (
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Minha Pokédex</CardTitle>
          <CardDescription>
            Selecione um Pokémon no menu lateral.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-sm overflow-hidden pt-0">
      <div className="flex aspect-video items-center justify-center bg-muted">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="size-40 object-contain"
        />
      </div>

      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-2xl capitalize">{pokemon.name}</CardTitle>

          <Badge variant="secondary">
            Nº {String(pokemon.id).padStart(3, "0")}
          </Badge>
        </div>

        <CardDescription>Pokémon registrado na Pokédex.</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          Consulte as informações deste Pokémon.
        </p>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={() =>
            window.open(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
              "_blank",
              "noopener,noreferrer",
            )
          }
        >
          Ver dados na PokéAPI
        </Button>
      </CardFooter>
    </Card>
  );
}
