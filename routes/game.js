const { createNewGame, startGame } = require('../controllers/bingo_game');

module.exports = app => {
    app.get('/game/new', createNewGame);
    app.get('/game/start/:gameId', startGame);
}
