export async function startNewGame() {
  const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
  const data = await response.json();
  return data;
}

export async function drawCard(deckId) {
  const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error('Ocorreu um erro durante a solicitação.');
}

export async function stopGame(deckId) {
  console.time('Tempo para as promessas');
  const result = await Promise.all([
    drawCard(deckId),
    drawCard(deckId),
    drawCard(deckId),
  ]);
  console.timeEnd('Tempo para as promessas');
  return result;
}
