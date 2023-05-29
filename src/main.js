import { startNewGame, drawCard, stopGame } from './helpers/fetchFunctions';
import { addCardToPlayer } from './helpers/addCard';
import { showResult } from './helpers/addCard' 
import './style.css';

const shuffleButton = document.querySelector('.shuffle');
const stopButton = document.querySelector('.stop');
const drawButton = document.querySelector('.draw');

let deckId;
const playersScore = {
  1: 0,
  2: 0,
};

shuffleButton.addEventListener('click', async () => {
  try {
    const dados = await startNewGame();
    const { deck_id: id } = dados;
    deckId = id;
    shuffleButton.disabled = true;
    drawButton.disabled = false;
    stopButton.disabled = false;
  } catch (error) {
    // tratamento de erros
    console.log(error);
  }
});

drawButton.addEventListener('click', async () => {
  try {
    const dados = await drawCard(deckId);
    const card = dados.cards[0];
    addCardToPlayer(card, 1, playersScore);
  } catch (error) {
    console.log(error);
  }
});

stopButton.addEventListener('click', async () => {
  const MAX_SCORE = 21;
  drawButton.disabled = true;
  stopButton.disabled = true;
  shuffleButton.disabled = false;

  const results = await stopGame(deckId); // essa func me devolve 3 cartas
  console.log(results);

  // cartas na tela
  results.forEach((data) => {
    const card = data.cards[0];
    addCardToPlayer(card, 2, playersScore);
  });

  if (playersScore[1] > MAX_SCORE) {
    return showResult('lose');
  }

  showResult('win');
});
