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

function drawDesk(desk, width, colors) {
    let deskDiv = document.getElementById('desk')
    deskDiv.style.gridTemplateColumns = `repeat(${width}, 1fr)`

    for (const row of desk) {
        for (const col of row) {
            let field = document.createElement('div')

            field.classList.add('field')
            field.style.backgroundColor = col.color === 'white' ? colors.deskWhite : colors.deskBlack
            field.textContent = col.position
            if(col.color === 'black'){
                field.style.color = 'white'
            }

            if(col.checker){
                let checker = document.createElement('div')

                checker.classList.add('checker')
                checker.style.backgroundColor = col.checker.color === 'white' ? colors.checkerWhite : colors.checkerBlack
                field.appendChild(checker)
            }

            deskDiv.appendChild(field)
        }
    }
}