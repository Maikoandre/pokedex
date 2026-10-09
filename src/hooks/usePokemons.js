import { useEffect, useState } from "react";

export function usePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0",
        );

        if (!response.ok) {
          throw new Error("Não foi possível buscar os Pokémon.");
        }

        const data = await response.json();

        const formattedPokemons = data.results.map((pokemon) => {
          const id = Number(pokemon.url.split("/").filter(Boolean).pop());

          return {
            id: id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });

        setPokemons(formattedPokemons);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  return { pokemons, loading, error };
}
