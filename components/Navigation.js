import React from "react";
import Link from "next/link";

function Navigation() {
  return (
    <nav className="mx-auto pb-4">
      <ul className="flex justify-evenly text-blue-500">
        <li>
          <Link
            className="hover:text-blue-800 active:text-blue-300 text-xl"
            href={"/"}
          >
            Pokédex
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-blue-800 active:text-blue-300 text-xl"
            href={"/Collection"}
          >
            Favorites
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-blue-800 active:text-blue-300 text-xl"
            href={"/Game"}
          >
            Pokémemory
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
