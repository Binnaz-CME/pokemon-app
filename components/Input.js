import React, { useState } from "react";
import Svg from "./Svg";
import Select from "./Select";

export default function Input({ handleSearch, loadingName, loadingType }) {
  const [pokemonName, setPokemonName] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState({});

  function handleChange(e) {
    const { value } = e.target;
    setSearchName(value);
    setPokemonName({ query: "name", value });
  }

  function handleSelect(e) {
    const { value } = e.target;
    setSearchType({ query: "types", value });
  }

  return (
    <div className="flex justify-center max-w-6xl">
      <form className="w-full max-w-sm my-10 m-auto">
        <div className="flex items-center border-b border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Charizard"
            value={searchName}
            aria-label="Name"
            onChange={handleChange}
          />

          <button
            onClick={(e) => handleSearch(pokemonName, e)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            {loadingName ? <Svg /> : null}
            {loadingName ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      <form className="w-full max-w-sm my-10 m-auto">
        <div className="flex items-center border-b border-blue-500 py-2">
          <Select onChange={handleSelect}></Select>

          <button
            onClick={(e) => handleSearch(searchType, e)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            {loadingType ? <Svg /> : null}
            {loadingType ? "Loading..." : "Search"}
          </button>
        </div>
      </form>
    </div>
  );
}
