/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export function usePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPokemons() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/limit=50&offset=0",
        );
        if (!response.ok) {
          throw new Error("Não foi possivel buscar os pokémons.");
        }
        const data = await response.json();
        const formattedPokemons = data.results.map((pokemons) => {
          const id = Number(pokemons.url.split("/").filter(Boolean).pop());
        });

        return {
          id: formattedPokemons.id,
          name: pokemons.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/${formattedPokemons.id}.png`,
        };
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getPokemons();
  }, [pokemons.name]);

  return { pokemons, loading, error };
}

