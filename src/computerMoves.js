// Function to generate two random coordinates
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
