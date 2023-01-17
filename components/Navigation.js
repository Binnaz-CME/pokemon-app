import React from "react";
import Link from "next/link";

function Navigation() {
  return (
    <nav className="my-10">
      <ul className="flex justify-evenly text-blue-500">
        <li className="mr-6">
          <Link className="hover:text-blue-800 active:text-blue-300 text-xl" href={"/"}>PokéDex</Link>
        </li>
        <li className="mr-6">
          <Link className="hover:text-blue-800 active:text-blue-300 text-xl" href={"/Game"}>PokéGame</Link>
        </li>
        <li className="mr-6">
          <Link className="hover:text-blue-800 active:text-blue-300 text-xl" href={"/Collection"}>My collection</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
