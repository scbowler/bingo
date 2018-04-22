const db = require('../services/firebase');
const { generateGameBalls } = require('../helpers');

exports.createNewGame = (req, res) => {
    const gameBalls = generateGameBalls();

    const newGame = {
        gameBalls,
        bingo: false
    }

    db.ref('/games').push(newGame).then( () => {

        res.send({success: true});
    }).catch( err => {
        console.log('Error creating new game:', err.message);

        res.status(500).send({ success: false });
    });
};

exports.startGame = (req, res) => {
    const { gameId } = req.params;

    drawBall(gameId).then( resp => {
        
        res.send({success: true});

    }).catch( err => {
        console.log('Draw Ball error:', err.message);

        res.status(500).send();
    });
}

function drawBall(gameId){
    const gameRef = db.ref(`/games/${gameId}`);
    return new Promise((resolve, reject) => {
        gameRef.once('value').then( snapshot => {
            const game = snapshot.val();
            let { gameBalls, calledBalls, currentBall, bingo } = game;

            if(bingo || !gameBalls) { 
                const updates = { calledBalls: [currentBall, ...calledBalls], currentBall: null };

                gameRef.update(updates).then( () => {
                    resolve(false);
                });

                return;
            };

            if (!Array.isArray(calledBalls)) calledBalls = [];

            const randomIndex = Math.floor(Math.random() * gameBalls.length);

            const nextBall = gameBalls.splice(randomIndex, 1)[0];

            const updates = { gameBalls, currentBall: nextBall, calledBalls: currentBall ? [currentBall , ...calledBalls] : []};

            gameRef.update(updates).then( resp => {
                resolve(nextBall);
                setTimeout(() => {
                    drawBall(gameId)
                }, 15000);
            });
        }).catch( err => {
            console.log('Error:', err.message);
            reject(err);
        });
    });
}
