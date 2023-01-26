import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Wrapper from "../components/Wrapper";
import GameCard from "../components/GameCard";
import { getGameCards } from "../axios/api";

export default function Game({ gameCards }) {
  const [cards, setCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  console.log(cards);

  function initiateGame() {
    const initalCards = [...gameCards, ...gameCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4(), matched: false }));

    setCards(initalCards);
    setCardOne(null);
    setCardTwo(null);
    setTurns(0);
  }

  function handleChoice(card) {
    cardOne ? setCardTwo(card) : setCardOne(card);
  }

  function resetTurn() {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  }

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);

      if (cardOne.src === cardTwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }

    const finishedGame = cards.every((card) => card.matched === true);

    if (finishedGame) {
      setScore(turns * 5);
    }
  }, [cardOne, cardTwo]);

  useEffect(() => {
    initiateGame();
  }, []);

  return (
    <Wrapper title="Pokémemory">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        <div>
          <p>Turns: {turns}</p>
          <p>Score: {score}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-300  active:bg-blue-900 text-white py-2 px-4 mt-5 rounded m-3"
          onClick={initiateGame}
        >
          Restart
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center max-w-3xl m-auto">
        {cards.map((card) => (
          <GameCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === cardOne || card === cardTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </Wrapper>
  );
}

export async function getStaticProps(context) {
  const maxPage = 1500;
  const minPage = 1;
  const randomPage = Math.floor(
    Math.random() * (maxPage - minPage + 1) + minPage
  );

  const cardObjects = await getGameCards(randomPage);

  const gameCards = cardObjects.map((card) => ({ src: card.images.large }));

  return {
    props: { gameCards },
  };
}
