import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import Pokemon from "../components/Pokemon";

export default function Collection() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("collection"));
    if (savedCards !== null) setCards(savedCards);
  }, []);
  

  function deleteFromCollection(id) {

    const filteredCards = cards.filter((card) => card.id !== id)

    setCards(filteredCards);
    
    localStorage.setItem('collection', JSON.stringify(filteredCards));
  }

  return (
    <Wrapper title="My collection">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
        {cards.map((card) => (
          <div className="relative" key={card.id}>
            <Pokemon pokemon={card} />
            <button onClick={() => deleteFromCollection(card.id)} className="absolute bottom-0 left-0 bg-blue-500 hover:bg-blue-300 active:bg-blue-900 text-white py-2 px-4 mt-5 rounded ">𝗫</button>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
