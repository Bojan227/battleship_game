import gameboard from './gameboardFactory';
import {removePreviousShipCoord, placeMultipleShips} from './helperFunctions';
import dom from './dom';
import styles from './style.css';

const gameFlow = (() => {
    const {createBoard, displayShips} = dom;
    const container = document.querySelector('.container');
    const mainBoard = document.querySelector('.user-board');
    const enemyBoard = document.querySelector('.enemy-board');
    const startGameButton = document.querySelector('.start-game');
    const winMsg = document.querySelector('.win-msg');

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

    const handleAttacks = () => {
        container.addEventListener('click', (e) => {
            if (e.target.className === 'container') return;
            if (e.target.parentElement.className === 'user-board') return;
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);

            console.log(x, y);

            if (e.target.parentElement.className === 'enemy-board') {
                const xAttack = document.createElement('h3');
                xAttack.classList.add('x');

                const emptyAttack = document.createElement('h3');
                emptyAttack.classList.add('empty-attack');

                computerPlayer.receiveAttack(x, y);

                if (e.target.children.length > 0) {
                    return;
                }

                console.log(e.target.children.length);
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
                console.log(coordX, coordY);

                mainPlayer.receiveAttack(coordX, coordY);

                // mainBoard.innerHTML = '';
                // displayEnemyAttacks(mainPlayer.getArray(), mainBoard);
                // displayShips(mainPlayerCoord);
                // mainPlayer.checkWin(winMsg, 'User');
            }
        });
    };

    startGameButton.addEventListener('click', () => {
        // updateGameboard();
        // startGameMsg.dataset.status = 'disable';
        // startGameMsg.classList.add('invisible');
        // startGameButton.classList.add('invisible');
        handleAttacks();
    });
})();
