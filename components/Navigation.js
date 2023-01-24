import React from "react";
import Link from "next/link";

function Navigation() {
  return (
    <nav className="mx-auto my-6">
      <ul className="flex justify-evenly text-blue-500">
        <li>
          <Link className="hover:text-blue-800 active:text-blue-300 text-xl" href={"/"}>PokéDex</Link>
        </li>
        <li>
          <Link className="hover:text-blue-800 active:text-blue-300 text-xl" href={"/Game"}>PokéMemory</Link>
        </li>
        <li>
          <Link className="hover:text-blue-800 active:text-blue-300 text-xl" href={"/Collection"}>MyCollection</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
