import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import Pokemon from "../components/Pokemon";
import Modal from "../components/Modal";

export default function Collection() {
  const [cards, setCards] = useState([]);
  const [chosenCard, setChosenCard] = useState({});
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("collection"));
    if (savedCards !== null) setCards(savedCards);
  }, []);

  function deleteFromCollection(id) {
    const filteredCards = cards.filter((card) => card.id !== id);

    setCards(filteredCards);

    localStorage.setItem("collection", JSON.stringify(filteredCards));
  }

  function confirmDelete(confirmed, id) {
    if (confirmed) {
      setShowModal(false);
      deleteFromCollection(id);
    } else {
      setShowModal(false);
    }
  }

  function handleModal(card) {
    setShowModal(true);
    setChosenCard(card);
  }

  return (
    <Wrapper title="Favorites">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center max-w-6xl m-auto">
        {cards.map((card) => (
          <div className="relative" key={card.id}>
            <Pokemon pokemon={card} />

            <button
              onClick={() => handleModal(card)}
              className="absolute bottom-0 left-0 bg-blue-500 hover:bg-blue-300 active:bg-blue-900 text-white px-2 text-md rounded "
            >
              𝗫
            </button>
          </div>
        ))}
      </div>
      {showModal ? <Modal confirmDelete={confirmDelete} card={chosenCard} /> : null}
    </Wrapper>
  );
}
