const assert = require('assert');
const db = require('../server/db');
const updateDb = require('../server/updateDb');

describe('Database', () => {
  describe('Game board', () => {

    beforeEach(() => {
      db.players = ['abcdefg', '12345']
      db.gameBoard = ['O', 'O', null, 'X', 'X', null, null, null, null]
    });

    afterEach(() => {
      db.players = []
      db.gameBoard = [null, null, null, null, null, null, null, null, null]
      db.isXTurn = false,
      db.gameComplete = false,
      db.message = null,
      db.winnerPattern = null
    });

    it('should be flagged as true if complete', () => {
      gameCompleteResponse = updateDb.updateGameBoardAndCheckWinner('abcdefg', 2).gameComplete;
      assert.equal(gameCompleteResponse, true)
    });

    it('should display an "X" for the next turn', () => {
      nextTurnResponse = updateDb.updateGameBoardAndCheckWinner('abcdefg', 8).nextTurn;
      assert.equal(nextTurnResponse, 'X')
    });
  });
});
