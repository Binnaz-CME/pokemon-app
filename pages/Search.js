import Wrapper from "../components/Wrapper";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import { searchPokemon, getPokemon } from "../axios/api";
import { PokemonList } from "../components/PokemonList";
import { useRouter } from "next/router";

export default function Search({ pokemonCards, searchParams }) {
  const [pokemon, setPokemon] = useState(pokemonCards);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [collection, setCollection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState({
    query: searchParams[0],
    value: searchParams[1],
  });
  const router = useRouter();

  function addToCollection(card) {
    const exists = collection && collection.find((item) => item.id === card.id);

    if (!exists) {
      setCollection((prev) => [...(prev || []), card]);
    }
  }

  async function handleSearch(query, event) {
    event.preventDefault();

    if (!query.value) return;

    router.replace(`/Search?q=${query.query}:${query.value}`, undefined, {
      shallow: true,
    });
    setQuery({ query: query.query, value: query.value });
    setLoading(true);
    setCurrentPage(1);

    const { data } = await searchPokemon(query.query, query.value, currentPage);

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
      if (!query.value) return;

      const { data } = await searchPokemon(
        query.query,
        query.value,
        currentPage
      );
      setDisabled(data.length < 15);
      setPokemon(data);
    }

    getNewPage();
  }, [currentPage]);

  useEffect(() => {
    if (!collection) return;

    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("collection"));
    setCollection(data);
  }, []);

  return (
    <Wrapper title="Pokédex">
      <Input
        handleSearch={handleSearch}
        loading={loading}
        loadingName={loadingName}
        loadingType={loadingType}
      />
      <PokemonList
        pokemon={pokemon}
        addToCollection={addToCollection}
        handlePageChange={handlePageChange}
        hideNext={disabled}
        currentPage={currentPage}
      />
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  const { q } = context.query;
  const searchParams = q.split(":");
  const result = await searchPokemon(searchParams[0], searchParams[1], 1);
  const { data } = result;

  return {
    props: { pokemonCards: data, searchParams },
  };
}
