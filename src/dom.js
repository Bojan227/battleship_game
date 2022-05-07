const domElements = (() => {
    const createBoard = (gameArr, container) => {
        container.innerHTML = '';
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
    };
})();

export default domElements;
