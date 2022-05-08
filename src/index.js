import gameboard from './gameboardFactory';
import {placeMultipleShips, handleDragEvents} from './helperFunctions';
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
    const newGameBtn = document.querySelector('.new-game');

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

    const dragElements = () => {
        const ships = document.querySelectorAll('.fill');
        const empties = document.querySelectorAll('.empty');

        // Fill Listeners

        for (const ship of ships) {
            ship.addEventListener('dragstart', dragStart);
            ship.addEventListener('dragend', dragEnd);
            ship.addEventListener('click', (e) => {
                const oldDirection = e.target.dataset.direction;
                const x = parseInt(e.target.parentElement.dataset.x);
                const y = parseInt(e.target.parentElement.dataset.y);
                const lng = parseInt(e.target.parentElement.dataset.ship);

                // if direction is horizontal changes to vertical and the other way around
                let d;
                if (e.target.dataset.direction === 'v') {
                    d = 'h';
                } else {
                    d = 'v';
                }

                // prevents ships going out of the board
                if (d === 'v' && x > 9 - lng + 1) {
                    return;
                }
                if (d === 'h' && y > 9 - lng + 1) {
                    return;
                }

                const mainBoardParameters = handleDragEvents(
                    mainPlayerCoord,
                    mainPlayer
                );
                let changeDirection = mainBoardParameters(
                    x,
                    y,
                    lng,
                    oldDirection,
                    x,
                    y,
                    d
                );
                changeDirection.moveShipWithNewCoord();

                // moveShipWithNewCoord(mainPlayerCoord, x, y, lng, oldDirection, x, y, d, mainPlayer)
                updateGameboard();
                dragElements();

                if (changeDirection.preventCollision()) {
                    // Returns the ship's direction to his previous coordinates by changing the old direction with new
                    changeDirection = mainBoardParameters(
                        x,
                        y,
                        lng,
                        d,
                        x,
                        y,
                        oldDirection
                    );
                    changeDirection.moveShipWithNewCoord();
                    updateGameboard();
                    dragElements();
                }
            });
        }

        // Loop through empties
        for (const empty of empties) {
            empty.addEventListener('dragover', dragOver);
            empty.addEventListener('dragenter', dragEnter);
            empty.addEventListener('dragleave', dragLeave);
            empty.addEventListener('drop', dragDrop);
        }

        // Drag functions
        function dragStart(e) {
            this.setAttribute('data-oldX', e.target.parentElement.dataset.x);
            this.setAttribute('data-oldY', e.target.parentElement.dataset.y);
            this.setAttribute('data-ln', e.target.parentElement.dataset.ship);
            this.setAttribute('data-dir', e.target.dataset.direction);
            this.setAttribute('data-select', 'true');
            setTimeout(() => this.classList.add('invisible'));
        }

        function dragEnd(e) {
            this.removeAttribute('data-select', 'true');
            this.removeAttribute('data-oldX', e.target.parentElement.dataset.x);
            this.removeAttribute('data-oldY', e.target.parentElement.dataset.y);
            this.removeAttribute(
                'data-ln',
                e.target.parentElement.dataset.ship
            );
            this.removeAttribute('data-dir', e.target.dataset.direction);
            this.className = 'fill';
        }

        function dragOver(e) {
            e.preventDefault();
        }
        function dragEnter(e) {
            e.preventDefault();
            this.className += ' hovered';
        }

        function dragLeave() {
            this.className = 'empty';
        }

        function dragDrop(e) {
            this.className = 'empty';

            const selectedShip = document.querySelector('[data-select="true"]');

            const length = parseInt(
                document.querySelector('[data-ln]').dataset.ln
            );
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);
            const d = document.querySelector('[data-dir]').dataset.dir;

            // Previous ship coordinates
            const oldX = parseInt(
                document.querySelector('[data-oldx]').dataset.oldx
            );
            const oldY = parseInt(
                document.querySelector('[data-oldy]').dataset.oldy
            );

            // Prevent placing the ships out of the board
            if (d === 'v' && this.dataset.x > 9 - length + 1) {
                return;
            }
            if (d === 'h' && this.dataset.y > 9 - length + 1) {
                return;
            }

            // appending the ships on empty cells
            if (
                this.dataset.ship === '' ||
                (this.dataset.ship !== '' &&
                    parseInt(this.dataset.ship) === length)
            ) {
                this.append(selectedShip);
            } else {
                return;
            }

            const mainBoardParameters = handleDragEvents(
                mainPlayerCoord,
                mainPlayer
            );
            let dragShipEvents = mainBoardParameters(
                oldX,
                oldY,
                length,
                d,
                x,
                y,
                d
            );
            dragShipEvents.moveShipWithNewCoord();

            updateGameboard();
            dragElements();
            // dragShipEvents

            // Check if ships are in collision
            if (dragShipEvents.preventCollision()) {
                // Returns the ship to his previous coordinates by passing oldx and oldy as new coordinates
                dragShipEvents = mainBoardParameters(
                    x,
                    y,
                    length,
                    d,
                    oldX,
                    oldY,
                    d
                );
                dragShipEvents.moveShipWithNewCoord();
                updateGameboard();
                dragElements();
            }
        }
    };

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
                    e.target.style.backgroundColor = '#E4E4E7';
                } else if (e.target.dataset.ship === '') {
                    e.target.append(emptyAttack);
                    e.target.style.backgroundColor = '#E4E4E7';
                }

                computerPlayer.checkWin(winMsg);

                // computer moves
                const [coordX, coordY] = generateRandomNumbers(enemyCoord);

                mainPlayer.receiveAttack(coordX, coordY);

                displayEnemyAttacks(mainPlayer.getArray(), mainBoard);
                displayShips(mainPlayerCoord);
                mainPlayer.checkWin(winMsg);
            }
        });
    }
    function updateGameboard() {
        createBoard(mainPlayer.getArray(), mainBoard);
        displayShips(mainPlayerCoord);
    }

    startGameButton.addEventListener('click', () => {
        updateGameboard();
        startGameMsg.dataset.status = 'disable';
        startGameMsg.classList.add('no-visibility');
        startGameButton.classList.add('no-visibility');
        handleAttacks();
    });
    const endGameScreen = document.querySelector('.endGame');
    newGameBtn.addEventListener('click', () => {
        endGameScreen.classList.add('no-visibility');
    });
    dragElements();
})();
