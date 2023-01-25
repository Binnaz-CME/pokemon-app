import axios from "axios";
import { config } from "../config";

export async function getCards() {
  const { data } = await axios.get(
    `https://api.pokemontcg.io/v2/cards?page=1&pageSize=15&orderBy=name,-number`,
    config
  );

  return data.data;
}

export async function getPokemon(page) {
  const { data } = await axios.get(
    `https://api.pokemontcg.io/v2/cards?page=${page}}&pageSize=15&orderBy=name,-number`,
    config
  );

  return data.data;
}

export async function searchPokemon(q, value, page) {
  const { data } = await axios.get(
    `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=15&q=${q}:"${value}"`,
    config
  );
  return data;
}

export async function getGameCards(randomPage) {
  const { data } = await axios.get(
    `https://api.pokemontcg.io/v2/cards?page=${randomPage}}&pageSize=8]`,
    config
  );

  return data.data;
}

export async function getSinglePokemon(context) {
  const { data } = await axios.get(
    `https://api.pokemontcg.io/v2/cards/${context.query.id}`,
    config
  );

  return data.data;
}
