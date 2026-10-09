import { useEffect, useState } from "react";

// Cache compartilhado entre todas as chamadas deste hook.
const pokemonCache = new Map();

export function usePokemonDetails(pokemonId) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonId) {
      setDetails(null);
      setLoading(false);
      setError(null);
      return;
    }

    // 1. Verifica se os dados já estão no cache.
    const cachedPokemon = pokemonCache.get(pokemonId);

    if (cachedPokemon) {
      setDetails(cachedPokemon);
      setLoading(false);
      setError(null);
      return;
    }

    // 2. Se não estiver no cache, consulta a API.
    const controller = new AbortController();

    async function fetchDetails() {
      try {
        setLoading(true);
        setError(null);
        setDetails(null);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar os detalhes do Pokémon.");
        }

        const data = await response.json();

        const pokemonDetails = {
          id: data.id,
          name: data.name,
          image:
            data.sprites.other?.["official-artwork"]?.front_default ??
            data.sprites.front_default,
          types: data.types.map((item) => item.type.name),
          height: data.height / 10,
          weight: data.weight / 10,
          abilities: data.abilities.map((item) => item.ability.name),
          stats: data.stats.map((item) => ({
            name: item.stat.name,
            value: item.base_stat,
          })),
        };

        // 3. Guarda os dados para as próximas seleções.
        pokemonCache.set(pokemonId, pokemonDetails);

        setDetails(pokemonDetails);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDetails();

    return () => controller.abort();
  }, [pokemonId]);

  return { details, loading, error };
}
