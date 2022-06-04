const mainBoard = document.querySelector('.user-board');

const handleDragEvents = (playerCoord, player) => {
    const mainCoord = playerCoord;
    const mainPlayer = player;
    const preventCollisionBetweenShips = (
        oldX,
        oldY,
        lng,
        oldDir,
        x,
        y,
        dir
    ) => {
        const oldXCoord = oldX;
        const oldYCoord = oldY;
        const length = lng;
        const oldDirection = oldDir;
        const xCoord = x;
        const yCoord = y;
        const direction = dir;

        // If Ship is dragged to new coord, removes the previous coordinates from the players array
        function removePreviousShipCoord() {
            mainCoord.forEach((coord) => {
                if (
                    coord.toString() ===
                    [oldXCoord, oldYCoord, length, oldDirection].toString()
                ) {
                    mainCoord.splice(mainCoord.indexOf(coord), 1);
                }
            });
        }
        //  Ship is dragged to new coord, push new coord into the Players array
        function pushNewCoord() {
            mainCoord.push([xCoord, yCoord, length, direction]);
        }
        //  Restart the gameboard array
        function restartMainArray() {
            mainPlayer.restartArray();
        }

        //  Place the coord into the gameboard array
        function placeMultipleShips() {
            mainCoord.forEach((coord) => {
                const [x, y, z, d] = coord;
                mainPlayer.placeShip(x, y, z, d);
            });
        }

        function moveShipWithNewCoord() {
            removePreviousShipCoord();
            pushNewCoord();
            restartMainArray();
            placeMultipleShips();
        }

        //  Prevent ships from colliding
        function preventCollision() {
            if (direction === 'h') {
                let counter = 0;
                const result = [];
                while (counter < length + 2) {
                    // Gets every cell that is around the ship based on ship's length

                    result.push(
                        mainBoard.querySelector(
                            `[data-x="${xCoord - 1}"][data-y="${
                                yCoord - 1 + counter
                            }"]`
                        )
                    );
                    result.push(
                        mainBoard.querySelector(
                            `[data-x="${xCoord}"][data-y="${
                                yCoord - 1 + counter
                            }"]`
                        )
                    );
                    result.push(
                        mainBoard.querySelector(
                            `[data-x="${xCoord + 1}"][data-y="${
                                yCoord - 1 + counter
                            }"]`
                        )
                    );

                    counter += 1;
                }
                // Collection of busy cells around the ship
                const collectBusyCells = [];
                const collectChild = [];
                result.forEach((val) => {
                    if (val != null) {
                        if (val.dataset.busy === 'busy') {
                            collectBusyCells.push(val);
                        }
                        if (val.firstChild != null) {
                            collectChild.push(val.firstChild);
                        }
                    }
                });

                // If there are more busy cells than the ship's length return the ship to the old coordinates

                if (
                    collectBusyCells.length > length ||
                    collectChild.length > 1
                ) {
                    return true;
                }

                // checks for ships that are vertically placed
            } else {
                let counter = 0;
                const result = [];
                while (counter < length + 2) {
                    result.push(
                        mainBoard.querySelector(
                            `[data-x="${xCoord - 1 + counter}"][data-y="${
                                yCoord - 1
                            }"]`
                        )
                    );
                    result.push(
                        mainBoard.querySelector(
                            `[data-x="${
                                xCoord - 1 + counter
                            }"][data-y="${yCoord}"]`
                        )
                    );
                    result.push(
                        mainBoard.querySelector(
                            `[data-x="${xCoord - 1 + counter}"][data-y="${
                                yCoord + 1
                            }"]`
                        )
                    );

                    counter += 1;
                }

                const checkForShip = [];
                const collectChild = [];
                result.forEach((val) => {
                    if (val != null) {
                        if (val.dataset.busy === 'busy') {
                            checkForShip.push(val);
                        }
                        if (val.firstChild != null) {
                            collectChild.push(val.firstChild);
                        }
                    }
                });

                if (checkForShip.length > length || collectChild.length > 1) {
                    return true;
                }
            }
        }

        return {
            moveShipWithNewCoord,
            preventCollision,
        };
    };

    return preventCollisionBetweenShips;
};

function placeMultipleShips(coordArr, choosePlayer) {
    coordArr.forEach((coord) => {
        const [x, y, z, d] = coord;
        choosePlayer.placeShip(x, y, z, d);
    });
}

export {placeMultipleShips, handleDragEvents};
