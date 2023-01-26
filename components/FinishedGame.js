import React from "react";

export default function FinishedGame({ turns, score, setShowModal }) {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-black opacity-90">
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 flex items-center text-red-500 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-xl font-bold py-4">
              You finished the game in {turns} turns and a final score of{" "}
              {score} points.
            </h2>
            <p className="text-lg py-4">
              Lowest score wins! Lowest possible is 80 points
            </p>
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
    </div>
  );
}
