import React from "react";
import Link from "next/link";

function Navigation() {
  return (
    <nav className="m-10">
      <ul className="flex justify-evenly text-blue-500">
        <li className="mr-6">
          <Link className="hover:text-blue-800 text-xl" href={"/"}>PokeDex</Link>
        </li>
        <li className="mr-6">
          <Link className="hover:text-blue-800 text-xl" href={"/Game"}>Game</Link>
        </li>
        <li className="mr-6">
          <Link className="hover:text-blue-800 text-xl" href={"/Collection"}>My collection</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
