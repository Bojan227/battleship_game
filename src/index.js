import gameboard from './gameboardFactory';
import placeMultipleShips from './helperFunctions';
import domElements from './dom';
import {generateRandomNumbers, generateRandomPositions} from './computerMoves';
import styles from './style.css';

const gameflow = (() => {
    const {createBoard, displayShips, displayEnemyAttacks} = domElements;
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

    placeMultipleShips(mainPlayerCoord, mainPlayer);
    createBoard(mainPlayer.getArray(), mainBoard);
    displayShips(mainPlayerCoord);
    for (let i = 1; i <= 6; i += 1) {
        const [x, y, z, d] = generateRandomPositions(i, computerPlayer);
        computerPlayer.placeShip(x, y, z, d);
        console.log(computerPlayer.getArray());
        createBoard(computerPlayer.getArray(), enemyBoard);
    }

    function handleAttacks() {
        container.addEventListener('click', (e) => {
            if (e.target.className === 'container') return;
            if (e.target.parentElement.className === 'user-board') return;
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);

            if (e.target.parentElement.className === 'enemy-board') {
                const xAttack = document.createElement('h3');
                xAttack.classList.add('x');

                const emptyAttack = document.createElement('h3');
                emptyAttack.classList.add('empty-attack');

                computerPlayer.receiveAttack(x, y);

                if (e.target.children.length > 0) {
                    return;
                }

                if (e.target.dataset.ship !== '') {
                    e.target.append(xAttack);
                    e.target.style.border = '2px solid #991B1B';
                } else if (e.target.dataset.ship === '') {
                    e.target.append(emptyAttack);
                    e.target.style.backgroundColor = '#E4E4E7';
                }

                computerPlayer.checkWin(winMsg, 'Computer');

                // computer moves
                const [coordX, coordY] = generateRandomNumbers(enemyCoord);

                mainPlayer.receiveAttack(coordX, coordY);

                displayEnemyAttacks(mainPlayer.getArray(), mainBoard);
                displayShips(mainPlayerCoord);
                mainPlayer.checkWin(winMsg, 'User');
            }
        });
    }

    startGameButton.addEventListener('click', () => {
        // updateGameboard();
        // startGameMsg.dataset.status = 'disable';
        // startGameMsg.classList.add('invisible');
        // startGameButton.classList.add('invisible');
        handleAttacks();
    });
})();
