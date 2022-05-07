import gameboard from './gameboardFactory';
import placeMultipleShips from './helperFunctions';
import styles from './style.css';

const gameflow = (() => {
    const container = document.querySelector('.container');
    const mainBoard = document.querySelector('.user-board');
    const enemyBoard = document.querySelector('.enemy-board');
    const startGameMsg = document.querySelector('.start-msg');
    const startGameButton = document.querySelector('.start-game');

    const winMsg = document.querySelector('.win-msg');
    const currentPlayer = 'user';

    const mainPlayerCoord = [
        [0, 5, 3, 'h'],
        [5, 3, 4, 'h'],
        [8, 8, 1, 'h'],
        [5, 8, 2, 'v'],
        [2, 1, 5, 'v'],
        [9, 0, 6, 'h'],
    ];
    const enemyCoord = [];
    const mainPlayer = gameboard();
    const computerPlayer = gameboard();
})();
