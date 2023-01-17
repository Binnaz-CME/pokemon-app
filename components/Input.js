import React, { useState } from "react";

export default function Input({ handleSearch }) {
  const [pokemon, setPokemon] = useState({});
  const [type, setType] = useState({});

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
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            onClick={(e) => handleSearch(pokemon, e)}
          >
            Search
          </button>
        </div>
      </form>

      <form className="w-full max-w-sm my-10">
        <div className="flex items-center border-b border-blue-500 py-2">
          <select
            className="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Fire"
            onChange={handleSelect}
          >
            <option value="">Select type</option>
            <option value="Colorless">Colorless</option>
            <option value="Dragon">Dragon</option>
            <option value="Fairy">Fairy</option>
            <option value="Fighting">Fighting</option>
            <option value="Fire">Fire</option>
            <option value="Lightning">Lightning</option>
            <option value="Metal">Metal</option>
            <option value="Psychic">Psychic</option>
            <option value="Water">Water</option>
          </select>

          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            onClick={(e) => handleSearch(type, e)}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
