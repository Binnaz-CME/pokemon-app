import React from "react";

export default function Select({ onChange }) {
  return (
    <select
      onChange={onChange}
      className="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none"
      placeholder="Fire"
    >
      <option value="">Select type</option>
      <option value="Colorless">Colorless</option>
      <option value="Dragon">Dragon</option>
      <option value="Fairy">Fairy</option>
      <option value="Fighting">Fighting</option>
      <option value="Fire">Fire</option>
      <option value="Lightning">Lightning</option>
      <option value="Metal">Metal</option>
      <option value="Psychic">Psychic</option>
      <option value="Water">Water</option>
    </select>
  );
}
