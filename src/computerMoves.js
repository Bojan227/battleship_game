const enemyBoard = document.querySelector('.enemy-board');

function generateRandomNumbers(mainCoord) {
    const coord = [];
    for (let i = 0; i < 2; i += 1) {
        coord.push(Math.floor(Math.random() * 10));
    }
    if (
        mainCoord.some(
            (element) => JSON.stringify(element) === JSON.stringify(coord)
        )
    ) {
        return generateRandomNumbers(mainCoord);
    }
    mainCoord.push(coord);
    return coord;
}

function generateRandomDirection() {
    const num = Math.floor(Math.random() * 10);
    return num < 5 ? 'v' : 'h';
}

function generateRandomPositions(z) {
    const enemyCoord = [];
    const [x, y] = generateRandomNumbers(enemyCoord);
    const dir = generateRandomDirection();

    if (dir === 'v' && x > 9 - z + 1) {
        return generateRandomPositions(z);
    }
    if (dir === 'h' && y > 9 - z + 1) {
        return generateRandomPositions(z);
    }

    if (dir === 'h') {
        let counter = 0;
        const result = [];
        while (counter < z + 2) {
            result.push(
                enemyBoard.querySelector(
                    `[data-x="${x - 1}"][data-y="${y - 1 + counter}"]`
                )
            );
            result.push(
                enemyBoard.querySelector(
                    `[data-x="${x}"][data-y="${y - 1 + counter}"]`
                )
            );
            result.push(
                enemyBoard.querySelector(
                    `[data-x="${x + 1}"][data-y="${y - 1 + counter}"]`
                )
            );

            counter += 1;
        }

        const checkForShip = [];
        result.forEach((val) => {
            if (val != null) {
                if (val.dataset.busy === 'busy') {
                    checkForShip.push(val);
                }
            }
        });

        if (checkForShip.length > 0) {
            return generateRandomPositions(z);
        }

        return [x, y, z, dir];
    }

    let counter = 0;
    const result = [];
    while (counter < z + 2) {
        result.push(
            enemyBoard.querySelector(
                `[data-x="${x - 1 + counter}"][data-y="${y - 1}"]`
            )
        );
        result.push(
            enemyBoard.querySelector(
                `[data-x="${x - 1 + counter}"][data-y="${y}"]`
            )
        );
        result.push(
            enemyBoard.querySelector(
                `[data-x="${x - 1 + counter}"][data-y="${y + 1}"]`
            )
        );

        counter += 1;
    }

    const checkForShip = [];
    result.forEach((val) => {
        if (val != null) {
            if (val.dataset.busy === 'busy') {
                checkForShip.push(val);
            }
        }
    });

    if (checkForShip.length > 0) {
        return generateRandomPositions(z);
    }
    return [x, y, z, dir];
}

export {generateRandomNumbers, generateRandomPositions};
