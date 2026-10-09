import { useEffect, useState } from "react";

export function usePokemonDetails(pokemonId) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonId) {
      setDetails(null);
      return;
    }

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
          throw new Error("Não foi possível carregar os detalhes.");
        }

        const data = await response.json();

        setDetails({
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
        });
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
