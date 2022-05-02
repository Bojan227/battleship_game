import gameboard from './gameboardFactory';
import {removePreviousShipCoord, placeMultipleShips} from './helperFunctions';
import dom from './dom';
import styles from './style.css';

const gameFlow = (() => {
    const {createBoard, displayShips} = dom;
    const container = document.querySelector('.container');
    const mainBoard = document.querySelector('.user-board');
    const enemyBoard = document.querySelector('.enemy-board');

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

    placeMultipleShips(mainPlayerCoord, mainPlayer);
    placeMultipleShips(mainPlayerCoord, computerPlayer);

    createBoard(mainPlayer.getArray(), mainBoard);
    createBoard(mainPlayer.getArray(), enemyBoard);

    displayShips(mainPlayerCoord);
    console.log(mainPlayer.getArray());
})();
