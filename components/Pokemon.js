import React from "react";
import Image from "next/image";
import Link from "next/link";

function Pokemon({ pokemon }) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div key={pokemon.id}>
        <Image
          alt={pokemon.name}
          src={pokemon.images.small}
          width={200}
          height={450}
        />
      </div>
    </Link>
  );
}

export default Pokemon;
