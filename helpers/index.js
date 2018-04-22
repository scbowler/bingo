
exports.generateGameBalls = () => {
    const ballCount = 75;
    const ballLetters = ['b', 'i', 'n', 'g', 'o'];
    const numbersPerLetter = ballCount / ballLetters.length;

    const gameBalls = [];

    for(let i = 0; i < ballCount; i++){
        const letter = ballLetters[Math.floor(i/numbersPerLetter)];

        gameBalls.push(letter + (i + 1));
    }

    return gameBalls;
}
