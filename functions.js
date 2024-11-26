function createDesk(deskSize, letters) {
    const desk = [];
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

function drawDesk(deskDiv, desk, width, colors) {
    deskDiv.style.gridTemplateColumns = `repeat(${width}, 1fr)`

    for (const row of desk) {
        for (const col of row) {
            let field = document.createElement('div')

            field.classList.add('field')
            field.dataset.id = col.position
            field.style.backgroundColor = col.color === 'white' ? colors.deskWhite : colors.deskBlack
            field.textContent = col.position
            if (col.color === 'black') {
                field.style.color = 'white'
            }

            if (col.checker) {
                let checker = document.createElement('div')

                checker.dataset.color = col.checker.color
                checker.classList.add('checker')
                checker.style.backgroundColor = col.checker.color === 'white' ? colors.checkerWhite : colors.checkerBlack
                field.appendChild(checker)
            }

            deskDiv.appendChild(field)
        }
    }
}

function Move(desk, checker, field, letters) {
    const checkerLet = checker.match(/[a-zA-Z]/g).join('');
    const checkerNum = parseInt(checker.match(/\d+/g).join(''), 10);

    const fieldLet = field.match(/[a-zA-Z]/g).join('');
    const fieldNum = parseInt(field.match(/\d+/g).join(''), 10);

    let selectedChecker = desk[desk.length - checkerNum][letters.indexOf(checkerLet)]
    let currentChecker = selectedChecker.checker
    if (
        Math.abs(checkerNum - fieldNum) === 1 &&
        Math.abs(letters.indexOf(checkerLet) - letters.indexOf(fieldLet)) === 1 &&
        (
            (checkerNum - fieldNum === -1 && currentChecker.color === 'white') ||
            (checkerNum - fieldNum === 1 && currentChecker.color === 'black')
        )
    ) {

        selectedChecker.checker = null

        let selectedField = desk[desk.length - fieldNum][letters.indexOf(fieldLet)]
        selectedField.checker = currentChecker

        const checkerElement = document.querySelector(`.field[data-id="${checker}"] .checker`);
        const fieldElement = document.querySelector(`.field[data-id="${field}"]`);

        checkerElement.remove()
        fieldElement.appendChild(checkerElement)

        checkerElement.style.boxShadow = ''
        return true
    }else if (
        Math.abs(checkerNum - fieldNum) === 2 &&
        Math.abs(letters.indexOf(checkerLet) - letters.indexOf(fieldLet)) === 2
    ){

    }
    return false
}