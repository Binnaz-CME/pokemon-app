import React from "react";
import Image from "next/image";
import back from "../images/pokemon_card_backside.png";

export default function GameCard({ card, handleChoice, flipped, disabled }) {
  function handleClick() {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className={card.matched ? "group h-[250px] w-[175px] [perspective:1000px] bg-amber-300 rounded-2xl border-8 border-amber-300" : "group h-[250px] w-[175px] [perspective:1000px] rounded-2xl hover:border-8 hover:rounded-2xl hover:border-blue-900 " }>
      <div
        className={
          flipped
            ? "relative h-full w-full shadow-xl transition-all duration-500 [transform-style:preserve-3d] [transform:rotateY(180deg)]"
            : "relative h-full w-full shadow-xl transition-all duration-500 [transform-style:preserve-3d]"
        }
      >
        <Image
          className="absolute h-full w-full rounded-xl object-fit"
          alt="back"
          src={back}
          width={150}
          height={250}
          onClick={handleClick}
        />

        <Image
          className="absolute h-full w-full rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]"
          alt="front"
          src={card.src}
          width={150}
          height={250}
        />
      </div>
    </div>
  );
}
