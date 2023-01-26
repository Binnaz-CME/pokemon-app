import React from "react";
import Pokemon from "./Pokemon";

export function PokemonList({
  pokemon,
  currentPage,
  hideNext,
  addToCollection,
  handlePageChange,
}) {
  console.log(pokemon);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center max-w-6xl m-auto">
        {pokemon.map((card) => (
          <div className="relative" key={card.id}>
            <Pokemon pokemon={card} />
            <button
              onClick={() => addToCollection(card)}
              className="bg-white hover:bg-blue-300 active:bg-blue-900 text-white py-1 px-2 rounded absolute bottom-0 left-0 text-[1.5rem]"
            >
              💙
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
          disabled={hideNext}
          className="disabled:bg-gray-500 bg-blue-500 hover:bg-blue-300  active:bg-blue-900 text-white py-2 px-7 mt-5 rounded m-3 "
          onClick={() => handlePageChange(true)}
        >
          Next
        </button>
      </div>
    </>
  );
}
