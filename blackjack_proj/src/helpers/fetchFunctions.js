export async function startNewGame() {
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');

  const data = await response.json(); // ... loading
  return data;
}

// essa func me devolve uma carta do baralho
export async function drawCard(deckId) {
  // return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
  //   .then((response) => response.json());

  const result = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);

  if (result.ok) {
    const data = await result.json();

    return data;
  }

  throw new Error('Alguma coisa aconteceu nesse mundo');

  // return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`).json();
}

export async function stopGame(deckId) {
  // console.time('Tempo para as promessas');
  // const card1 = await drawCard(deckId); // espera aqui ate terminar
  // const card2 = await drawCard(deckId); // depois faz essa linha
  // const card3 = await drawCard(deckId); // termina com essa linha
  // console.timeEnd('Tempo para as promessas');
  // promessas: 1435.90380859375 ms
  // return [card1, card2, card3];

  console.time('Tempo para as promessas');
  const result = await Promise.all([
    drawCard(deckId),
    drawCard(deckId),
    drawCard(deckId),
  ]);
  console.timeEnd('Tempo para as promessas');
  // promessas: 615.251220703125 ms

  return result;
}
