import Wrapper from "../components/Wrapper";
import Pokemon from "../components/Pokemon";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import { getCards, getPokemon, searchPokemon } from "./axios/api";

export default function Home({ pokemonCards }) {
  const [pokemon, setPokemon] = useState(pokemonCards);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [collection, setCollection] = useState(null);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState(false);

  function addToCollection(card) {
    const exists = collection && collection.find((item) => item.id === card.id);

    if (!exists) {
      setCollection((prev) => [...(prev || []), card]);
    }
  }

  async function handleSearch(query, e) {
    e.preventDefault();
    setLoading(true);
    setSearch(true);
    setCurrentPage(1);

    let q;

    if (query.query === "types") {
      q = "types";
      setLoadingType(true);
    } else {
      q = "name";
      setLoadingName(true);
    }

    setQuery({ value: query.value, q });

    const { data } = await searchPokemon(q, query.value, currentPage);

    setPokemon(data);
    setLoading(false);
    setLoadingName(false);
    setLoadingType(false);
  }

  function handlePageChange(next) {
    setCurrentPage(next ? currentPage + 1 : currentPage - 1);
  }

  useEffect(() => {
    async function getNewPage() {
      if (search) {
        const { data } = await searchPokemon(query.q, query.value, currentPage);
        console.log(data);
        setDisabled(data.length < 15);
        setPokemon(data);
      } else {
        setLoading(true);
        const newPage = await getPokemon(currentPage);
        setPokemon(newPage);
        setLoading(false);
      }
    }

    getNewPage();
  }, [currentPage, search]);

  useEffect(() => {
    if (!collection) return;

    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("collection"));
    setCollection(data);
  }, []);

  // if(loading) return <Wrapper><p className="h-screen">Loading...</p></Wrapper>

  return (
    <Wrapper title="PokéDex">
      <Input
        handleSearch={handleSearch}
        loading={loading}
        loadingName={loadingName}
        loadingType={loadingType}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center max-w-6xl m-auto">
        {pokemon.map((card) => (
          <div className="relative" key={card.id}>
            <Pokemon pokemon={card} />
            <button
              onClick={() => addToCollection(card)}
              className="bg-blue-500 hover:bg-blue-300 active:bg-blue-900 text-white py-2 px-4 mt-5 rounded absolute bottom-0 left-0"
            >
              ♥️
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center text-sm m-6">
        <button
          disabled={currentPage === 1}
          className="disabled:bg-gray-500 bg-blue-500 hover:bg-blue-300 active:bg-blue-900 text-white py-2 px-4 mt-5 rounded m-3 "
          onClick={() => handlePageChange(false)}
        >
          Previous
        </button>
        <p className="py-2 px-8">{currentPage}</p>
        <button
          disabled={disabled}
          className="disabled:bg-gray-500 bg-blue-500 hover:bg-blue-300  active:bg-blue-900 text-white py-2 px-7 mt-5 rounded m-3 "
          onClick={() => handlePageChange(true)}
        >
          Next
        </button>
      </div>
    </Wrapper>
  );
}

export async function getStaticProps(context) {
  const pokemonCards = await getCards();

  return {
    props: { pokemonCards },
  };
}
