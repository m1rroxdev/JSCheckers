const deskSize = {width: 8, height: 8};

const checkersNumber = 24

const deskColors = {
    deskWhite: 'white',
    deskBlack: 'black',
    checkerWhite: 'white',
    checkerBlack: 'red'
}

const clearDesk = createDesk(deskSize);

const desk = initGame(checkersNumber, clearDesk)

console.log(desk)

drawDesk(desk, deskSize.width, deskColors)