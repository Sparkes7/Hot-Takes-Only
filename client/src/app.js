import { getRandomMovie } from "./fetchapi";

async function Main() {
  console.log(await getRandomMovie());
}
Main();
