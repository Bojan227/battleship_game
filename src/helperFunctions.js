function placeMultipleShips(coordArr, choosePlayer) {
    coordArr.forEach((coord) => {
        const [x, y, z, d] = coord;
        choosePlayer.placeShip(x, y, z, d);
    });
}

export default placeMultipleShips;
