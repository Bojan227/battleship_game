import gameboard from '../src/gameboardFactory';

test('place ship', () => {
    const newBoard = gameboard();
    newBoard.placeShip(1, 8, 6, 'v');
    newBoard.placeShip(5, 1, 5, 'h');
    expect(newBoard.placeShip(0, 1, 3, 'h')).toEqual([
        ['', 3, 3, 3, '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', 6, ''],
        ['', '', '', '', '', '', '', '', 6, ''],
        ['', '', '', '', '', '', '', '', 6, ''],
        ['', '', '', '', '', '', '', '', 6, ''],
        ['', 5, 5, 5, 5, 5, '', '', 6, ''],
        ['', '', '', '', '', '', '', '', 6, ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
    ]);
});
test('receive attack', () => {
    const newBoard = gameboard();
    newBoard.placeShip(0, 1, 3, 'h');
    newBoard.placeShip(1, 1, 6, 'h');
    newBoard.placeShip(5, 1, 5, 'h');
    newBoard.receiveAttack(0, 0);
    newBoard.receiveAttack(5, 4);
    expect(newBoard.receiveAttack(0, 1)).toEqual([
        ['e', 'x', 3, 3, '', '', '', '', '', ''],
        ['', 6, 6, 6, 6, 6, 6, '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', 5, 5, 5, 'x', 5, '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
    ]);
});

test('if all ships have sunk', () => {
    const newBoard = gameboard();
    newBoard.placeShip(0, 5, 3, 'h');
    newBoard.placeShip(9, 0, 6, 'h');
    newBoard.placeShip(2, 1, 5, 'v');
    newBoard.placeShip(5, 3, 4, 'h');
    newBoard.placeShip(8, 8, 1, 'v');
    newBoard.placeShip(5, 8, 2, 'v');

    newBoard.receiveAttack(0, 5);
    newBoard.receiveAttack(0, 6);
    newBoard.receiveAttack(0, 7);

    newBoard.receiveAttack(9, 0);
    newBoard.receiveAttack(9, 1);
    newBoard.receiveAttack(9, 2);
    newBoard.receiveAttack(9, 3);
    newBoard.receiveAttack(9, 4);
    newBoard.receiveAttack(9, 5);

    newBoard.receiveAttack(2, 1);
    newBoard.receiveAttack(3, 1);
    newBoard.receiveAttack(4, 1);
    newBoard.receiveAttack(5, 1);
    newBoard.receiveAttack(6, 1);

    newBoard.receiveAttack(5, 3);
    newBoard.receiveAttack(5, 4);
    newBoard.receiveAttack(5, 5);
    newBoard.receiveAttack(5, 6);

    newBoard.receiveAttack(8, 8);

    newBoard.receiveAttack(5, 8);
    newBoard.receiveAttack(6, 8);

    expect(newBoard.checkSunk()).toBe(true);
});

test("restart ship's healt", () => {
    const newBoard = gameboard();
    newBoard.placeShip(0, 5, 3, 'h');
    newBoard.placeShip(9, 0, 6, 'h');
    newBoard.placeShip(2, 1, 5, 'v');
    newBoard.placeShip(5, 3, 4, 'h');
    newBoard.placeShip(8, 8, 1, 'v');
    newBoard.placeShip(5, 8, 2, 'v');

    newBoard.receiveAttack(0, 5);
    newBoard.receiveAttack(0, 6);
    newBoard.receiveAttack(0, 7);

    newBoard.receiveAttack(9, 0);
    newBoard.receiveAttack(9, 1);
    newBoard.receiveAttack(9, 2);
    newBoard.receiveAttack(9, 3);
    newBoard.receiveAttack(9, 4);
    newBoard.receiveAttack(9, 5);

    newBoard.receiveAttack(2, 1);
    newBoard.receiveAttack(3, 1);
    newBoard.receiveAttack(4, 1);
    newBoard.receiveAttack(5, 1);
    newBoard.receiveAttack(6, 1);

    newBoard.receiveAttack(5, 3);
    newBoard.receiveAttack(5, 4);
    newBoard.receiveAttack(5, 5);
    newBoard.receiveAttack(5, 6);

    newBoard.receiveAttack(8, 8);

    newBoard.receiveAttack(5, 8);
    newBoard.receiveAttack(6, 8);

    newBoard.restartShipsHealth();

    expect(newBoard.checkSunk()).toBe(false);
});
