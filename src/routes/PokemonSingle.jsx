import {useState, useEffect, useMemo} from "react";
import { useParams } from 'react-router-dom';
import usePokemonList from "../contexts/pokemonList";
import {Link} from "react-router-dom";

export default function PokemonSingle() {
  const { id } = useParams();
  const [pokemons] = usePokemonList();

  const current2 = useMemo(() => pokemons.find(pokemon => `${pokemon.id}` === id), [id, pokemons]);

  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const pokemon = pokemons.find(pokemon => `${pokemon.id}` === id);
    setCurrent(pokemon);
  }, [id, pokemons])


  if (!current) return <>Loading...</>;

  return (
    <div className="px-6 py-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-2">{current.name}</h1>
      <p>Attack: {current.attack}</p>
      <p>Defense: {current.defense}</p>
      <p>Type: {current.type}</p>
      <Link to="/pokemons" className="border px-4 py-2 text-base rounded mt-4">Back</Link>
    </div>
  )
}