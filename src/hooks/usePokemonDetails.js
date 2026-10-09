import { useEffect, useState } from "react";

const pokemonCache = new Map();

export function usePokemonDetails(pokemonId) {
  const [result, setResult] = useState({
    pokemonId: null,
    details: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!pokemonId) return;

    let cancelled = false;

    async function fetchDetails() {
      const cachedPokemon = pokemonCache.get(pokemonId);

      if (cachedPokemon) {
        setResult({
          pokemonId,
          details: cachedPokemon,
          loading: false,
          error: null,
        });
        return;
      }

      setResult({
        pokemonId,
        details: null,
        loading: true,
        error: null,
      });

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar os detalhes do Pokémon.");
        }

        const data = await response.json();

        const details = {
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

        pokemonCache.set(pokemonId, details);

        if (!cancelled) {
          setResult({
            pokemonId,
            details,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setResult({
            pokemonId,
            details: null,
            loading: false,
            error: err.message,
          });
        }
      }
    }

    fetchDetails();

    return () => {
      cancelled = true;
    };
  }, [pokemonId]);

  // Evita exibir os dados do Pokémon anterior durante a troca.
  if (!pokemonId) {
    return {
      details: null,
      loading: false,
      error: null,
    };
  }

  if (result.pokemonId !== pokemonId) {
    return {
      details: null,
      loading: true,
      error: null,
    };
  }

  return {
    details: result.details,
    loading: result.loading,
    error: result.error,
  };
}
