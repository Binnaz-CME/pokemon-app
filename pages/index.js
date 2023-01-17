import Wrapper from "../components/Wrapper";
import Pokemon from "../components/Pokemon";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home({ pokemonCards }) {

  const [pokemon, setPokemon] = useState(pokemonCards);
  const [page, setPage] = useState(1);
  // const [loading, seLoading] = useState(false);
  const [collection, setCollection] = useState(null);


  async function getPokemon(url, next) {

    const response = await axios.get(url, {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });

    const nextPokemon = response.data.data;
    setPokemon(nextPokemon);

    setPage(next ? page + 1 : page - 1);
  }


  function addToCollection(card) {
    
    const exists = collection && collection.find((item) => item.id === card.id);

    if (!exists) {
      setCollection((prev) => [...prev, card])
    }
  }

  useEffect(() => {
    if(!collection) return;

    localStorage.setItem('collection', JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('collection'))
    setCollection(data)
  }, [])
  

  return (
    <Wrapper title="PokeDex">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {pokemon.map((card) => (
          <div className="relative" key={card.id}>
            <Pokemon pokemon={card} />
            <button
              onClick={() => addToCollection(card)}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-5 rounded absolute bottom-0 left-0"
            >
              ♥️
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center text-sm m-6">
        <button
          disabled={page === 1}
          className="disabled:bg-gray-500 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-5 rounded  m-3"
          onClick={() =>
            getPokemon(
              `https://api.pokemontcg.io/v2/cards?page=${page}}&pageSize=25&orderBy=name,-number`,
              false
            )
          }
        >
          Prev
        </button>
        <button
          className="disabled:bg-gray-500 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-5 rounded m-3"
          onClick={() =>
            getPokemon(
              `https://api.pokemontcg.io/v2/cards?page=${page}}&pageSize=25&orderBy=name,-number`,
              true
            )
          }
        >
          Next
        </button>
      </div>
    </Wrapper>
  );
}

export async function getStaticProps(context) {
  const response = await axios.get(
    `https://api.pokemontcg.io/v2/cards?page=1&pageSize=25&orderBy=name,-number`,
    {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    }
  );

  const pokemonCards = response.data.data;

  return {
    props: { pokemonCards },
  };
}
