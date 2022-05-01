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

    return {
        createBoard,
    };
})();

export default dom;
