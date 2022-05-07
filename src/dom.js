const dom = (() => {
    const createBoard = (gameArr, container) => {
        for (let i = 0; i < 10; i += 1) {
            gameArr[i].forEach((element, n) => {
                const squareDiv = document.createElement('div');
                squareDiv.setAttribute('data-x', i);
                squareDiv.setAttribute('data-y', n);

                container.className === 'user-board'
                    ? squareDiv.classList.add('empty')
                    : false;

                typeof element === 'number'
                    ? squareDiv.setAttribute('data-busy', 'busy')
                    : false;

                squareDiv.setAttribute('data-ship', element);

                container.appendChild(squareDiv);
            });
        }
    };

    const displayEnemyAttacks = (gameArr, container) => {
        for (let i = 0; i < 10; i += 1) {
            gameArr[i].forEach((element, n) => {
                const squareDiv = document.createElement('div');
                squareDiv.setAttribute('data-x', i);
                squareDiv.setAttribute('data-y', n);

                const xAttack = document.createElement('h3');
                xAttack.classList.add('x');

                const emptyAttack = document.createElement('h3');
                emptyAttack.classList.add('empty-attack');

                if (typeof element === 'number') {
                    squareDiv.textContent = '';
                } else if (element === 'e') {
                    squareDiv.append(emptyAttack);
                    squareDiv.style.backgroundColor = '#E4E4E7';
                } else if (element === 'x') {
                    squareDiv.append(xAttack);
                    squareDiv.style.border = '2px solid #991B1B';
                }

                container.appendChild(squareDiv);
            });
        }
    };

    const displayShips = (coordArr) => {
        coordArr.forEach((coord) => {
            const shipDiv = document.createElement('div');
            shipDiv.classList.add('fill');
            shipDiv.draggable = 'true';
            const [x, y, z, d] = coord;
            const firstDiv = document.querySelector(
                `.user-board>[data-x="${x}"][data-y="${y}"]`
            );

            if (d === 'h') {
                const shipWidth = z * 40;
                shipDiv.style.width = `${shipWidth}px`;
                shipDiv.style.height = '40px';
                shipDiv.setAttribute('data-direction', 'h');

                firstDiv.appendChild(shipDiv);
            } else {
                const shipHeight = z * 40;
                shipDiv.style.width = '40px';
                shipDiv.style.height = `${shipHeight}px`;
                shipDiv.setAttribute('data-direction', 'v');

                firstDiv.appendChild(shipDiv);
            }
        });
    };

    return {
        createBoard,
        displayShips,
        displayEnemyAttacks,
    };
})();

export default dom;
