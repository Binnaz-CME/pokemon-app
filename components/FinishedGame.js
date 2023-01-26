import React from "react";
import Image from "next/image";
import ash from "../images/ash.svg";

export default function FinishedGame({ turns, score, setShowModal }) {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-slate-800 opacity-90">
        <div className="flex">
        <Image src={ash} height={200} width={100} alt="ash" />

          <div className="text-center p-5 flex-auto justify-center">
            <h2 className="text-xl font-bold py-4">
              You finished the game in {turns} turns and a final score of{" "}
              {score} points.
            </h2>
            <p className="text-lg py-4">
              Lowest score wins! Lowest possible is 80 points
            </p>
          </div>
          
          </div>
          <div className="p-3 mt-2 text-center space-x-4 md:block">
            <button
              onClick={() => setShowModal(false)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              Close
            </button>
        </div>
      </div>
    </div>
  );
}
