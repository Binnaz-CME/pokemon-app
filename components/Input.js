import React, { useState } from "react";
import Svg from "./Svg";
import Select from "./Select";

export default function Input({ handleSearch, loading }) {
  const [pokemon, setPokemon] = useState({});
  const [type, setType] = useState({});

  console.log(type);
  function handleChange(e) {
    const { value } = e.target;
    setPokemon({ query: pokemon, value });
  }

  function handleSelect(e) {
    const { value } = e.target;
    setType({ query: "types", value });
  }

  return (
    <div className="flex justify-between">
      <form className="w-full max-w-sm my-10">
        <div className="flex items-center border-b border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Charizard"
            value={pokemon.value}
            aria-label="Name"
            onChange={handleChange}
          />

          <button
            onClick={(e) => handleSearch(pokemon, e)}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            {loading && type.query !== "types" ? <Svg /> : null}
            {loading && type.query !== "types" ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      <form className="w-full max-w-sm my-10">
        <div className="flex items-center border-b border-blue-500 py-2">
          <Select
            onChange={handleSelect}
          >
          </Select>

          <button
            onClick={(e) => handleSearch(type, e)}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            {loading ? <Svg /> : null}
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>
    </div>
  );
}
