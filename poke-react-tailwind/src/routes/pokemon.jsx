import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { name } = useParams();
  const [moveFilter, setMoveFilter] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        console.log(data); // Log fetched data
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [name]); // Added name as dependency

  return (
    <>
      <h1>{name}</h1>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {pokemon && (
            <>
              <h2>ID: {pokemon.id}</h2>
              <img
                src={pokemon.sprites?.front_default || "/placeholder/img"}
                alt={name}
              />
              <div>
                <input
                  type="text"
                  className="border"
                  placeholder="Filter moves..."
                  onChange={(e) => setMoveFilter(e.target.value)}
                />
                {/* Display filtered moves */}
                {pokemon.moves
                  .filter(({ move }) => move.name.includes(moveFilter))
                  .map(({ move }) => (
                    <p key={move.name}>{move.name}</p>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
