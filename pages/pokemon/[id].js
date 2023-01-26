import React from "react";
import Wrapper from "../../components/Wrapper";
import Image from "next/image";
import { getSinglePokemon } from "../../axios/api";

export default function singlePokemon({ singlePokemon }) {
  return (
    <Wrapper title={singlePokemon.name}>
      <div className="flex min-h-screen justify-center m-3">
        <div className="group h-[558px] w-[400px] [perspective:1000px]">
          <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0">
              <Image
                className="rounded-xl"
                src={singlePokemon.images.large}
                alt={singlePokemon.name}
                height={558}
                width={400}
              />
            </div>
            <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-blue-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex min-h-full flex-col items-center justify-center">
                <h1 className="text-5xl font-bold m-3">{singlePokemon.name}</h1>
                <p className="text-2xl m-2">
                  First released: {singlePokemon.set.releaseDate}
                </p>
                <p className="text-2xl m-2">
                  Total printed: {singlePokemon.set.printedTotal} copies
                </p>
                <p className="text-2xl m-2">Rarity: {singlePokemon.rarity}</p>
                <p className="text-2xl m-2 mb-2">
                  Average sell price:{" "}
                  {`${singlePokemon.cardmarket.prices?.averageSellPrice}€` ??
                    " Not available"}
                </p>
                <div className="mt-5 rounded-md bg-neutral-700 py-2 px-4 text-md hover:bg-blue-900">
                  <a href={singlePokemon.tcgplayer.url} target="_blank">
                    Read More
                  </a>
                </div>
              </div>
            </div>
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
