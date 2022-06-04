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

    const mainPlayerCoord = [
        [0, 5, 3, 'h'],
        [5, 3, 4, 'h'],
        [8, 8, 1, 'h'],
        [5, 8, 2, 'v'],
        [2, 1, 5, 'v'],
        [9, 0, 6, 'h'],
    ];
    let enemyCoord = [];

    const mainPlayer = gameboard();
    const computerPlayer = gameboard();

    placeMultipleShips(mainPlayerCoord, mainPlayer);
    createBoard(mainPlayer.getArray(), mainBoard);
    displayShips(mainPlayerCoord);
    createBoard(computerPlayer.getArray(), enemyBoard);

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
            setTimeout(() => this.classList.add('no-visibility'));
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

    let currentCoord = [];
    let rightCounter = 1;
    let leftCounter = 1;
    let topCounter = 1;
    let botCounter = 1;

    // One bug where computer player making one less move

    function handleAttacks() {
        container.addEventListener('click', (e) => {
            if (e.target.className === 'container') return;
            if (e.target.parentElement.className === 'user-board') return;
            if (startGameMsg.dataset.status === 'active') {
                return;
            }
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);

            function randomAttack() {
                const [coordX, coordY] = generateRandomNumbers(enemyCoord);

                mainPlayer.receiveAttack(coordX, coordY);
                displayEnemyAttacks(mainPlayer.getArray(), mainBoard);
                displayShips(mainPlayerCoord);
                mainPlayer.checkWin(winMsg);

                const currentAttackCell = mainBoard.querySelector(
                    `[data-x="${coordX}"][data-y="${coordY}"]`
                );

                if (currentAttackCell.firstChild.className === 'x') {
                    currentCoord = [coordX, coordY];
                }
            }

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
                // need to get direction of the ship

                if (currentCoord.length < 1) {
                    const [coordX, coordY] = generateRandomNumbers(enemyCoord);

                    mainPlayer.receiveAttack(coordX, coordY);
                    displayEnemyAttacks(mainPlayer.getArray(), mainBoard);
                    displayShips(mainPlayerCoord);
                    mainPlayer.checkWin(winMsg);

                    const currentAttackCell = mainBoard.querySelector(
                        `[data-x="${coordX}"][data-y="${coordY}"]`
                    );

                    if (currentAttackCell.firstChild.className === 'x') {
                        currentCoord = [coordX, coordY];
                    }
                } else if (currentCoord.length > 1) {
                    const [a, b] = currentCoord;

                    const rightCell = mainBoard.querySelector(
                        `[data-x="${a}"][data-y="${b + 1}"]`
                    );
                    const previousRightCell = mainBoard.querySelector(
                        `[data-x="${a}"][data-y="${b + rightCounter - 1}"]`
                    );
                    const nextRightCell = mainBoard.querySelector(
                        `[data-x="${a}"][data-y="${b + (rightCounter + 1)}"]`
                    );
                    let moveToLeft = 0;

                    if (moveToLeft !== 0) {
                        return goLeft();
                    }
                    if (rightCell === null) {
                        return goLeft();
                    }
                    if (
                        rightCell.firstChild === null ||
                        rightCell.firstChild.className === 'fill'
                    ) {
                        mainPlayer.receiveAttack(a, b + rightCounter);
                        enemyCoord.push([a, b + rightCounter]);
                        displayEnemyAttacks(mainPlayer.getArray(), mainBoard);
                        displayShips(mainPlayerCoord);
                        mainPlayer.checkWin(winMsg);
                        rightCounter += 1;
                        if (
                            nextRightCell.firstChild !== null &&
                            nextRightCell.firstChild.className ===
                                'empty-attack'
                        ) {
                            moveToLeft += 1;
                        }
                    } else if (
                        rightCell.firstChild !== null &&
                        rightCell.firstChild.className === 'empty-attack'
                    ) {
                        return goLeft();
                    } else if (
                        rightCell.firstChild === null ||
                        rightCell.firstChild.className === 'x'
                    ) {
                        if (previousRightCell.dataset.y === '9') {
                            return goLeft();
                        }

                        if (
                            previousRightCell.firstChild.className ===
                            'empty-attack'
                        ) {
                            return goLeft();
                        }

                        mainPlayer.receiveAttack(a, b + rightCounter);
                        enemyCoord.push([a, b + rightCounter]);
                        displayEnemyAttacks(mainPlayer.getArray(), mainBoard);
                        displayShips(mainPlayerCoord);
                        mainPlayer.checkWin(winMsg);
                        rightCounter += 1;
                        if (
                            nextRightCell.firstChild !== null &&
                            nextRightCell.firstChild.className ===
                                'empty-attack'
                        ) {
                            moveToLeft += 1;
                        }
                    }

                    // start going right

                    function goLeft() {
                        const leftCell = mainBoard.querySelector(
                            `[data-x="${a}"][data-y="${b - 1}"]`
                        );
                        const previousLeftCell = mainBoard.querySelector(
                            `[data-x="${a}"][data-y="${b - leftCounter + 1}"]`
                        );
                        const nextLeftCell = mainBoard.querySelector(
                            `[data-x="${a}"][data-y="${b - leftCounter - 1}"]`
                        );
                        let moveToTop = 0;

                        if (moveToTop !== 0) {
                            return goTop();
                        }
                        if (leftCell === null) {
                            return goTop();
                        }
                        if (
                            leftCell.firstChild === null ||
                            leftCell.firstChild.className === 'fill'
                        ) {
                            mainPlayer.receiveAttack(a, b - leftCounter);
                            enemyCoord.push([a, b - leftCounter]);
                            displayEnemyAttacks(
                                mainPlayer.getArray(),
                                mainBoard
                            );
                            displayShips(mainPlayerCoord);
                            mainPlayer.checkWin(winMsg);
                            leftCounter += 1;
                            if (
                                nextLeftCell.firstChild !== null &&
                                nextLeftCell.firstChild.className ===
                                    'empty-attack'
                            ) {
                                moveToTop += 1;
                            }
                        } else if (
                            leftCell.firstChild !== null &&
                            leftCell.firstChild.className === 'empty-attack'
                        ) {
                            return goTop();
                        } else if (
                            leftCell.firstChild === null ||
                            leftCell.firstChild.className === 'x'
                        ) {
                            if (previousLeftCell.dataset.y === '0') {
                                return goTop();
                            }

                            if (
                                previousLeftCell.firstChild.className ===
                                'empty-attack'
                            ) {
                                return goTop();
                            }
                            mainPlayer.receiveAttack(a, b - leftCounter);
                            enemyCoord.push([a, b - leftCounter]);
                            displayEnemyAttacks(
                                mainPlayer.getArray(),
                                mainBoard
                            );
                            displayShips(mainPlayerCoord);
                            mainPlayer.checkWin(winMsg);
                            leftCounter += 1;
                            if (
                                nextLeftCell.firstChild !== null &&
                                nextLeftCell.firstChild.className ===
                                    'empty-attack'
                            ) {
                                moveToTop += 1;
                            }
                        }
                    }

                    function goTop() {
                        const topCell = mainBoard.querySelector(
                            `[data-x="${a - 1}"][data-y="${b}"]`
                        );
                        const previousTopCell = mainBoard.querySelector(
                            `[data-x="${a - topCounter + 1}"][data-y="${b}"]`
                        );
                        const nextTopCell = mainBoard.querySelector(
                            `[data-x="${a - topCounter - 1}"][data-y="${b}"]`
                        );
                        let moveToBot = 0;

                        if (moveToBot !== 0) {
                            return goBot();
                        }

                        if (topCell === null) {
                            return goBot();
                        }
                        if (
                            topCell.firstChild === null ||
                            topCell.firstChild.className === 'fill'
                        ) {
                            mainPlayer.receiveAttack(a - topCounter, b);
                            enemyCoord.push([a - topCounter, b]);
                            displayEnemyAttacks(
                                mainPlayer.getArray(),
                                mainBoard
                            );
                            displayShips(mainPlayerCoord);
                            mainPlayer.checkWin(winMsg);
                            topCounter += 1;
                            if (
                                nextTopCell.firstChild !== null &&
                                nextTopCell.firstChild.className ===
                                    'empty-attack'
                            ) {
                                moveToBot += 1;
                            }
                        } else if (
                            topCell.firstChild !== null &&
                            topCell.firstChild.className === 'empty-attack'
                        ) {
                            return goBot();
                        } else if (
                            topCell.firstChild === null ||
                            topCell.firstChild.className === 'x'
                        ) {
                            if (previousTopCell.dataset.x === '0') {
                                return goBot();
                            }

                            if (
                                previousTopCell.firstChild.className ===
                                'empty-attack'
                            ) {
                                return goBot();
                            }
                            mainPlayer.receiveAttack(a - topCounter, b);
                            enemyCoord.push([a - topCounter, b]);
                            displayEnemyAttacks(
                                mainPlayer.getArray(),
                                mainBoard
                            );
                            displayShips(mainPlayerCoord);
                            mainPlayer.checkWin(winMsg);
                            topCounter += 1;
                            if (
                                nextTopCell.firstChild !== null &&
                                nextTopCell.firstChild.className ===
                                    'empty-attack'
                            ) {
                                moveToBot += 1;
                            }
                        }
                    }

                    function goBot() {
                        const botCell = mainBoard.querySelector(
                            `[data-x="${a + 1}"][data-y="${b}"]`
                        );
                        const previousBotCell = mainBoard.querySelector(
                            `[data-x="${a + botCounter - 1}"][data-y="${b}"]`
                        );
                        const nextBotCell = mainBoard.querySelector(
                            `[data-x="${a + botCounter + 1}"][data-y="${b}"]`
                        );
                        let restart = 0;

                        if (restart !== 0) {
                            currentCoord = [];
                            rightCounter = 1;
                            leftCounter = 1;
                            topCounter = 1;
                            botCounter = 1;
                            return randomAttack();
                        }

                        if (botCell === null) {
                            currentCoord = [];
                            rightCounter = 1;
                            leftCounter = 1;
                            topCounter = 1;
                            botCounter = 1;
                            return randomAttack();
                        }
                        if (
                            botCell.firstChild === null ||
                            botCell.firstChild.className === 'fill'
                        ) {
                            mainPlayer.receiveAttack(a + botCounter, b);
                            enemyCoord.push([a + botCounter, b]);
                            displayEnemyAttacks(
                                mainPlayer.getArray(),
                                mainBoard
                            );
                            displayShips(mainPlayerCoord);
                            mainPlayer.checkWin(winMsg);
                            botCounter += 1;
                            if (
                                nextBotCell.firstChild !== null &&
                                nextBotCell.firstChild.className ===
                                    'empty-attack'
                            ) {
                                restart += 1;
                            }
                        } else if (
                            botCell.firstChild !== null &&
                            botCell.firstChild.className === 'empty-attack'
                        ) {
                            currentCoord = [];
                            rightCounter = 1;
                            leftCounter = 1;
                            topCounter = 1;
                            botCounter = 1;
                            return randomAttack();
                        } else if (
                            botCell.firstChild === null ||
                            botCell.firstChild.className === 'x'
                        ) {
                            if (previousBotCell.dataset.x === '9') {
                                currentCoord = [];
                                rightCounter = 1;
                                leftCounter = 1;
                                topCounter = 1;
                                botCounter = 1;
                                return randomAttack();
                            }

                            if (
                                previousBotCell.firstChild.className ===
                                'empty-attack'
                            ) {
                                currentCoord = [];
                                rightCounter = 1;
                                leftCounter = 1;
                                topCounter = 1;
                                botCounter = 1;
                                return randomAttack();
                            }
                            mainPlayer.receiveAttack(a + botCounter, b);
                            enemyCoord.push([a + botCounter, b]);
                            displayEnemyAttacks(
                                mainPlayer.getArray(),
                                mainBoard
                            );
                            displayShips(mainPlayerCoord);
                            mainPlayer.checkWin(winMsg);
                            botCounter += 1;
                            if (
                                nextBotCell.firstChild !== null &&
                                nextBotCell.firstChild.className ===
                                    'empty-attack'
                            ) {
                                restart += 1;
                            }
                        }
                    }
                }
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
        for (let i = 6; i >= 1; i -= 1) {
            const [x, y, z, d] = generateRandomPositions(i);
            computerPlayer.placeShip(x, y, z, d);

            createBoard(computerPlayer.getArray(), enemyBoard);
        }

        handleAttacks();
    });
    const endGameScreen = document.querySelector('.endGame');
    newGameBtn.addEventListener('click', () => {
        startGameMsg.classList.remove('no-visibility');
        startGameMsg.dataset.status = 'active';
        startGameButton.classList.remove('no-visibility');
        endGameScreen.classList.add('no-visibility');

        enemyCoord = [];
        mainPlayer.restartArray();
        computerPlayer.restartArray();

        mainPlayer.restartShipsHealth();
        computerPlayer.restartShipsHealth();

        placeMultipleShips(mainPlayerCoord, mainPlayer);
        createBoard(mainPlayer.getArray(), mainBoard);
        displayShips(mainPlayerCoord);
        createBoard(computerPlayer.getArray(), enemyBoard);
        dragElements();
        currentCoord = [];
        rightCounter = 1;
        leftCounter = 1;
        topCounter = 1;
        botCounter = 1;
    });
    dragElements();
})();
