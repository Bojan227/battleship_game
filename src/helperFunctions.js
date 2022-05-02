// Removes the coordinates of previous placed ship
function removePreviousShipCoord(playerArr, coordx, coordy, lng, direction) {
    playerArr.forEach((coord) => {
        if (
            JSON.stringify(coord) ===
            JSON.stringify([coordx, coordy, lng, direction])
        ) {
            playerArr.splice(playerArr.indexOf(coord), 1);
        }
    });
}

function placeMultipleShips(coordArr, choosePlayer) {
    coordArr.forEach((coord) => {
        const [x, y, z, d] = coord;
        choosePlayer.placeShip(x, y, z, d);
    });
}

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

export {removePreviousShipCoord, placeMultipleShips};
