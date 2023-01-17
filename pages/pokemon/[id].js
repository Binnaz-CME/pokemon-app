import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import Image from "next/image";

function singlePokemon({ singlePokemon }) {


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
              Total printed: {singlePokemon.set.printedTotal}
            </p>
            <p className="m-2">Rarity: {singlePokemon.rarity}</p>
            <p className="m-2">
              Average sell price:
              {singlePokemon.cardmarket.prices.averageSellPrice} €
            </p>
          
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default singlePokemon;

export async function getServerSideProps(context) {
  const response = await axios.get(
    `https://api.pokemontcg.io/v2/cards/${context.query.id}`,
    {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    }
  );

  const singlePokemon = response.data.data;

  return {
    props: { singlePokemon },
  };
}
