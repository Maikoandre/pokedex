import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";

const statLabels = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Atq. especial",
  "special-defense": "Def. especial",
  speed: "Velocidade",
};

export default function PokemonCard({ pokemon }) {
  const { details, loading, error } = usePokemonDetails(pokemon?.id);

  if (!pokemon) {
    return (
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Minha Pokédex</CardTitle>
          <CardDescription>
            Selecione um Pokémon no menu lateral.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full max-w-3xl">
        <CardContent className="p-6">
          Carregando informações de {pokemon.name}...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-3xl">
        <CardContent className="p-6 text-destructive">{error}</CardContent>
      </Card>
    );
  }

  if (!details) return null;

  return (
    <Card className="w-full max-w-3xl overflow-hidden pt-0">
      <div className="grid gap-6 bg-muted/40 p-6 sm:grid-cols-[220px_1fr]">
        <div className="flex items-center justify-center">
          <img
            src={details.image}
            alt={details.name}
            className="aspect-square w-full max-w-52 object-contain"
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Nº {String(details.id).padStart(3, "0")}
            </p>

            <h2 className="text-3xl font-bold capitalize">{details.name}</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {details.types.map((type) => (
              <Badge key={type} variant="secondary" className="capitalize">
                {type}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Altura</p>
              <p className="font-medium">{details.height} m</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Peso</p>
              <p className="font-medium">{details.weight} kg</p>
            </div>
          </div>
        </div>
      </div>

      <CardHeader>
        <CardTitle>Habilidades</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        {details.abilities.map((ability) => (
          <Badge key={ability} variant="outline" className="capitalize">
            {ability.replaceAll("-", " ")}
          </Badge>
        ))}
      </CardContent>

      <CardHeader>
        <CardTitle>Atributos base</CardTitle>
        <CardDescription>Valores de referência deste Pokémon.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {details.stats.map((stat) => (
          <div key={stat.name} className="space-y-1">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted-foreground">
                {statLabels[stat.name] ?? stat.name}
              </span>

              <span className="font-medium tabular-nums">{stat.value}</span>
            </div>

            <Progress value={Math.min((stat.value / 255) * 100, 100)} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
