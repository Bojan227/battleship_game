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

export {removePreviousShipCoord, placeMultipleShips};
