import gameboard from './gameboardFactory';
import {removePreviousShipCoord, placeMultipleShips} from './helperFunctions';

const gameFlow = (() => {
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
