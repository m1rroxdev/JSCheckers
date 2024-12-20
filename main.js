const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const deskSize = {width: 8, height: 8};

const checkersNumber = 24

const deskColors = {
    deskWhite: 'white',
    deskBlack: 'black',
    checkerWhite: 'white',
    checkerBlack: 'red'
}

const clearDesk = createDesk(deskSize, letters);

const desk = initGame(checkersNumber, clearDesk)

console.log(desk)

const deskElement = document.getElementById('desk')

drawDesk(deskElement, desk, deskSize.width, deskColors)

let activeChecker = null

let isWhiteMove = true

deskElement.addEventListener('click', function (e) {
    const field = e.target.closest('.field');
    if (field) {
        const checker = field.querySelector('.checker')
        const fieldPosition = field.dataset.id
        if (checker) {
            if (((isWhiteMove && checker.dataset.color === 'white') || (!isWhiteMove && checker.dataset.color === 'black'))){
                if (activeChecker) {
                    const checkerElement = document.querySelector(`.field[data-id="${activeChecker}"] .checker`);
                    checkerElement.style.boxShadow = ''
                }
                checker.style.boxShadow = '0px 0px 15px 10px #999d0c'
                activeChecker = fieldPosition
            }
        } else {
            if (activeChecker) {
                let move = Move(desk, activeChecker, fieldPosition, letters)
                if (move){
                    activeChecker = null
                    isWhiteMove = !isWhiteMove
                }
            }
        }
    }
})

