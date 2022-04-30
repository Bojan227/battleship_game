import gameboard from '../src/gameboardFactory';

test('place ship', () => {
    const newBoard = gameboard();
    newBoard.placeShip(1, 8, 4, 'v');
    newBoard.placeShip(5, 1, 3, 'h');
    expect(newBoard.placeShip(0, 1, 2, 'h')).toEqual([
        ['', 2, 2, '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', 4, ''],
        ['', '', '', '', '', '', '', '', 4, ''],
        ['', '', '', '', '', '', '', '', 4, ''],
        ['', '', '', '', '', '', '', '', 4, ''],
        ['', 3, 3, 3, '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
    ]);
});
test('receive attack', () => {
    const newBoard = gameboard();
    newBoard.placeShip(0, 1, 2, 'h');
    newBoard.placeShip(1, 1, 4, 'h');
    newBoard.placeShip(5, 1, 5, 'h');
    newBoard.receiveAttack(0, 0);
    newBoard.receiveAttack(5, 4);
    expect(newBoard.receiveAttack(0, 1)).toEqual([
        ['e', 'x', 2, '', '', '', '', '', '', ''],
        ['', 4, 4, 4, 4, '', '', '', '', ''],
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
    newBoard.placeShip(0, 1, 3, 'h');
    newBoard.placeShip(1, 1, 6, 'h');
    newBoard.placeShip(5, 1, 5, 'h');
    newBoard.placeShip(0, 0, 1, 'h');
    newBoard.placeShip(1, 8, 2, 'v');
    newBoard.placeShip(9, 1, 4, 'h');

    newBoard.receiveAttack(0, 0);

    newBoard.receiveAttack(9, 1);
    newBoard.receiveAttack(9, 2);
    newBoard.receiveAttack(9, 3);
    newBoard.receiveAttack(9, 4);

    newBoard.receiveAttack(1, 8);
    newBoard.receiveAttack(2, 8);

    newBoard.receiveAttack(0, 1);
    newBoard.receiveAttack(0, 2);
    newBoard.receiveAttack(0, 3);

    newBoard.receiveAttack(1, 1);
    newBoard.receiveAttack(1, 2);
    newBoard.receiveAttack(1, 3);
    newBoard.receiveAttack(1, 4);
    newBoard.receiveAttack(1, 5);
    newBoard.receiveAttack(1, 6);

    newBoard.receiveAttack(5, 1);
    newBoard.receiveAttack(5, 2);
    newBoard.receiveAttack(5, 3);
    newBoard.receiveAttack(5, 4);
    newBoard.receiveAttack(5, 5);

    expect(newBoard.checkSunk()).toBe(true);
});
