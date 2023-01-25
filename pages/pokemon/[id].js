import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import Image from "next/image";
import { getSinglePokemon } from "../../axios/api";

export default function singlePokemon({ singlePokemon }) {
  return (
    <Wrapper title={singlePokemon.name}>
      <div className="flex m-5 flex-col justify-center items-center">
        <Image
          src={singlePokemon.images.large}
          alt={singlePokemon.name}
          height={900}
          width={400}
        />

        <div className="flex justify-center mt-5 ">
          <div>
            <p className="m-2">
              First released: {singlePokemon.set.releaseDate}
            </p>
            <p className="m-2">
              Total printed: {singlePokemon.set.printedTotal} copies
            </p>
            <p className="m-2">Rarity: {singlePokemon.rarity}</p>
            <p className="m-2">
              Average sell price (€):{" "}
              {singlePokemon.cardmarket.prices?.averageSellPrice ??
                " Not available"}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  const singlePokemon = await getSinglePokemon(context);

  return {
    props: { singlePokemon },
  };
}
