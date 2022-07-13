const gameSection = document.createElement('div');
gameSection.classList.add('squaresSection');

const menuReturn = document.createElement('button');
menuReturn.classList.add('btn');

const hint = document.createElement('button');
hint.classList.add('btn');

const gameField = document.createElement('div');
const gameMenu = document.querySelector('.game');
const btnsField = document.createElement('div');
const finalResult = document.createElement('h2');

let squares = [];
let activeCard = "";
const activeCards= [];
let gameResult = 0;
const cardsColor = [];

// Hide menu
const hiddenMenu = () => {
    gameMenu.animate(
    [
        {transform: 'translateY(0px)'},
        {transform: 'translateY(-260vh)'}
        
    ],
    {duration: 600},
    )
    setTimeout(() => {
        gameMenu.style.display = "none";
    }, 500)
}

//Game field

const startGame = () => {
    gameSection.style.display = 'flex';
    document.body.appendChild(gameField);
    gameField.appendChild(gameSection);
    gameField.classList.add("newGame");
    gameField.animate(
        [
            {transform: 'translateY(260vh)'},
            {transform: 'translateY(0px)'}
        ],
        {duration: 1000}
    )
    setTimeout(() => {
        gameField.appendChild(btnsField);
        btnsField.appendChild(hint);
        btnsField.appendChild(menuReturn);
        hint.textContent = "Podpowiedź"
        menuReturn.textContent = "Wróć do menu";
        gameField.style.display = "flex";

    }, 500);
}
const showHint = setTimeout(showCards, 2500);
        function showCards() {

            squares.forEach((square) => {
            square.classList.remove("hidden");
        })
    }

hint.addEventListener('click', () => {
    squares.forEach((square) => {
        square.classList.remove("hidden");
    })
    setTimeout(() => {
        squares.forEach((square) => {
            square.classList.add("hidden");
        })
    }, 1500);
});

// Color draw

function drawCard() {
    const minValue = 1118481;
    const maxValue = 16777215;
    const randomColor = Math.floor(Math.random()*(maxValue - minValue) + minValue).toString(16);
    cardsColor.push(`#${randomColor}`, `#${randomColor}`);
};

// Card Check
const clickCard = function() {
    activeCard = this;
    activeCard.classList.remove("hidden");
    activeCard.style.pointerEvents = "none";
    if (activeCards.length === 0) {
        activeCards[0] = activeCard.dataset.id;
        return;
    } else {
        squares.forEach(square => square.removeEventListener('click', clickCard));
        activeCards[1] = activeCard.dataset.id;
        setTimeout(function(){
        if (activeCards[0] === activeCards[1]) {
            let removeCards = document.querySelectorAll(`div[data-id='${activeCards[1]}']`);
            removeCards.forEach(card => card.classList.add("off"));
            gameResult++;
            if(gameResult == squares.length/2) {
                gameResult = 0;
                gameSection.style.display = "none";
                gameField.appendChild(finalResult);
                finalResult.textContent = "Wygrana!";
                finalResult.classList.add('finalResult');
            }
        } else {
            squares.forEach(square => square.classList.add('hidden'));
            document.querySelectorAll(`div[data-id]`).forEach(e => e.style.pointerEvents = "auto");
        }
        activeCards.length = 0;
        activeCard = "";
        squares.forEach(square => square.addEventListener('click', clickCard));
    }, 500)
    }
}

// Init

const levelStart = document.querySelectorAll('.level section').forEach((e) => {
    e.addEventListener('click', () => {
        const hiddenCards = setTimeout(hideCards, 2500);
        function hideCards() {

            squares.forEach((square) => {
            square.classList.add("hidden");
        })
    }

        let name = e.getAttribute('class');
        hiddenMenu();
        startGame();

        if(name == 'easy') {
            for (let i = 0; i < 16; i++) {
                const card = document.createElement('div');
                card.classList.add('easyCard')
                gameSection.appendChild(card);
                squares.push(card);
            }
            for (let i = 0; i < 8; i++) {
                drawCard();
            }

            squares.forEach((square) => {
                const position = Math.floor(Math.random()*cardsColor.length);
                square.style.background = (cardsColor[position]);
                square.dataset.id = (cardsColor[position]);
                cardsColor.splice(position, 1);
                square.addEventListener('click', clickCard);
                });

        } else if(name == 'medium') {
            for (let i = 0; i < 18; i++) {
                drawCard();
            }
            for (let i = 0; i < 36; i++) {
                const card = document.createElement('div');
                card.classList.add('mediumCard')
                gameSection.appendChild(card);
                squares.push(card);
            }
            squares.forEach((square) => {
                const position = Math.floor(Math.random()*cardsColor.length);
                square.style.backgroundColor = (cardsColor[position]);
                square.dataset.id = (cardsColor[position]);
                cardsColor.splice(position, 1);
                square.addEventListener('click', clickCard);
            });
            
        } else {
            for (let i = 0; i < 32; i++) {
                drawCard();
            }
            for (let i = 0; i < 64; i++) {
                const card = document.createElement('div');
                squares.push(card);
                card.classList.add('hardCard');
                gameSection.appendChild(card);
            }
            squares.forEach((square) => {
                const position = Math.floor(Math.random()*cardsColor.length);
                square.style.backgroundColor = (cardsColor[position]);
                square.dataset.id = (cardsColor[position]);
                cardsColor.splice(position, 1);
                square.addEventListener('click', clickCard);
            });
        };
    });
});

//Back to menu

menuReturn.addEventListener('click', () => {
    gameField.animate(
        [
            {transform: 'translateY(0)'},
            {transform: 'translateY(-260vh)'}
        ],
        {duration: 1000}
    )
    gameMenu.animate(
        [
            {transform: 'translateY(-260vh)'},
            {transform: 'translateY(0)'}
            
        ],
        {duration: 700},
        )
    setTimeout(() => {
        while(gameField.lastChild === finalResult) {
            gameField.removeChild(finalResult);
        }
        gameField.style.display = "none";
        gameMenu.style.display = "flex";
        while (gameSection.firstChild) {
            gameSection.removeChild(gameSection.firstChild);
        }
    }, 500)
    cardsColor.length = 0;
    squares = [];
})

