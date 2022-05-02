import ship from '../src/shipFactory';

test('length goes down', () => {
    const newShip = ship(3);
    newShip.hit();
    newShip.hit();
    expect(newShip.getLength()).toBe(1);
});

test('length goes down', () => {
    const newShip = ship(5);
    newShip.hit();
    expect(newShip.getLength()).toBe(4);
});

test('isSunk example', () => {
    const newShip = ship(2);
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
});
test('isSunk second example', () => {
    const newShip = ship(2);
    newShip.hit();

    expect(newShip.isSunk()).toBe(false);
});
