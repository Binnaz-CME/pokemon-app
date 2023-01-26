import Wrapper from "../components/Wrapper";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import { getCards, getPokemon, searchPokemon } from "../axios/api";
import { useRouter } from "next/router";
import { PokemonList } from "../components/PokemonList";
import Spinner from "../components/Spinner";

export default function Home({ pokemonCards }) {
  const [pokemon, setPokemon] = useState(pokemonCards);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [search, setSearch] = useState(false);
  const [collection, setCollection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState({});
  const router = useRouter();

  const handleSearch = (event) => {
    if (!event.value) return;

    setSearch(true);
    setQuery({ query: event.query, value: event.value });
    router.push(`/Search?q=${event.query}:${event.value}`, undefined, {
      shallow: true,
    });
  };

  function addToCollection(card) {
    const exists = collection && collection.find((item) => item.id === card.id);

    if (!exists) {
      setCollection((prev) => [...(prev || []), {...card, liked: true}]);
    }
  }

  function handlePageChange(next) {
    setCurrentPage(next ? currentPage + 1 : currentPage - 1);
  }

  useEffect(() => {
    if (!collection) return;

    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("collection"));
    setCollection(data);
  }, []);

  useEffect(() => {
    async function getNewPage() {
      if (search) {
        const { data } = await searchPokemon(
          query.query,
          query.value,
          currentPage
        );

        setDisabled(data.length < 15);
        setPokemon(data);
      } else {
        console.log("new page");
        setLoading(true);
        const newPage = await getPokemon(currentPage);
        setPokemon(newPage);
        setLoading(false);
      }
    }

    getNewPage();
  }, [currentPage, search]);

  return (
    <Wrapper title="Pokédex" >
      <Input handleSearch={handleSearch} />
      {loading ? (
       <Spinner />
      ) : (
        <PokemonList
          pokemon={pokemon}
          addToCollection={addToCollection}
          handlePageChange={handlePageChange}
          hideNext={disabled}
          currentPage={currentPage}
        />
      )}
    </Wrapper>
  );
}

export async function getStaticProps() {
  const pokemonCards = await getCards();

  return {
    props: { pokemonCards },
  };
}
