import { drawCard, startNewGame } from './fetchFunctions';

describe('API testing', () => {
  describe('startNewGame', () => {
    it('Deve retornar um objeto com os dados da API', async () => {
      const data = await startNewGame();
      expect(data.success).toBe(true);
      expect(data.remaining).toBe(52);
      expect(data.shuffled).toBe(true);
    });
  });

  describe('drawCard', () => {
    it('Deve retornar um objeto com os dados da API', async () => {
      const data = await startNewGame(); // pego o id primeiro
      const result = await drawCard(data.deck_id);
      const card = result.cards[0];

      expect(card.value).toBeDefined();
      expect(card.image).toBeDefined();
    });

    it('Deve retornar um erro caso o deck_id seja inválido', async () => {
      const result = drawCard('invalido');
      await expect(result).rejects.toThrow('Alguma coisa aconteceu nesse mundo');
    });

    it('Deve retornar um erro caso o deck_id seja inválido (async/await)', async () => {
      try {
        await drawCard('invalido'); // vai dar erro
      } catch (error) {
        expect(error.message).toBe('Alguma coisa aconteceu nesse mundo');
      }
    });
  });
});
