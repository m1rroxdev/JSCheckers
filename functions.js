function createDesk(deskSize) {
    const desk = [];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let row = 0; row < deskSize.height; row++) {
        const rowArray = [];
        for (let col = 0; col < deskSize.width; col++) {

            const color = (row + col) % 2 === 0 ? 'white' : 'black';
            const position = `${letters[col]}${deskSize.height - row}`;

            rowArray.push({color, position, checker: null});
        }
        desk.push(rowArray);
    }

    return desk;
}

function initGame(checkersNumber, desk) {
    let i = checkersNumber
    line: for (const line of desk) {
        for (const cell of line) {
            if (i > (checkersNumber / 2)) {
                if (cell.color === 'black') {
                    cell.checker = {
                        color: 'black',
                        isAQueen: false,
                    }
                    i--
                }
            } else {
                break line
            }
        }
    }
    desk.reverse()
    line: for (const line of desk) {
        for (const cell of line) {
            if (i > 0) {
                if (cell.color === 'black') {
                    cell.checker = {
                        color: 'white',
                        isAQueen: false,
                    }
                    i--
                }
            } else {
                break line
            }
        }
    }
    return desk.reverse()
}