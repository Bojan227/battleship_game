import ship from './shipFactory';

const gameboard = () => {
    const endGameScreen = document.querySelector('.endGame');

    let gameboardArray = Array.from(Array(10), () => new Array(10).fill(''));

    let shipArray = [ship(3), ship(4), ship(2), ship(1), ship(5), ship(6)];

    function placeShip(x, y, length, direction) {
        let i = 0;
        if (direction === 'h') {
            while (i < length) {
                gameboardArray[x][y + i] = shipArray
                    .find((x) => x.getLength() === length)
                    .getLength();
                i += 1;
            }
        } else if (direction === 'v') {
            while (i < length) {
                gameboardArray[x + i][y] = shipArray
                    .find((x) => x.getLength() === length)
                    .getLength();
                i += 1;
            }
        }

        return gameboardArray;
    }

    function receiveAttack(x, y) {
        if (typeof gameboardArray[x][y] === 'number') {
            const shipLength = gameboardArray[x][y];

            shipArray.find((x) => x.length === shipLength).hit(); // length goes down by one
            gameboardArray[x][y] = 'x';
        } else if (gameboardArray[x][y] === 'x') {
            return;
        } else {
            gameboardArray[x][y] = 'e';
        }

        return gameboardArray;
    }

    function checkSunk() {
        const result = [];
        for (const ship in shipArray) {
            result.push(shipArray[ship].isSunk());
        }
        return result.every((x) => x === true);
    }

    function checkWin(winMsg) {
        if (checkSunk()) {
            endGameScreen.classList.remove('no-visibility');
            winMsg.textContent = `You win`;
        } else {
            winMsg.textContent = `You win`;
        }
    }

    function restartArray() {
        gameboardArray = '';
        gameboardArray = Array.from(Array(10), () => new Array(10).fill(''));
        return gameboardArray;
    }

    function restartShipsHealth() {
        shipArray = [ship(3), ship(4), ship(1), ship(2), ship(5), ship(6)];
    }
    function getArray() {
        return gameboardArray;
    }

    return {
        placeShip,
        receiveAttack,
        checkSunk,
        checkWin,
        restartArray,
        getArray,
        restartShipsHealth,
    };
};

export default gameboard;
