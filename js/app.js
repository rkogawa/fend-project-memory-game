/*
 * Create a list that holds all of your cards
 */
const cards = [
    { type: 'fa-diamond' }, { type: 'fa-diamond' },
    { type: 'fa-paper-plane-o' }, { type: 'fa-paper-plane-o' },
    { type: 'fa-anchor' }, { type: 'fa-anchor' },
    { type: 'fa-bolt' }, { type: 'fa-bolt' },
    { type: 'fa-cube' }, { type: 'fa-cube' },
    { type: 'fa-leaf' }, { type: 'fa-leaf' },
    { type: 'fa-bicycle' }, { type: 'fa-bicycle' },
    { type: 'fa-bomb' }, { type: 'fa-bomb' },
];

let openCards = [];
let matchCards = [];
let countMoves = 0;
let numberOfStars = 3;
let totalSeconds = 0;
let timer;
let gameInitialized = false;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * If exists two cards that don't match, close cards.
 */
function hideOldCards() {
    if (openCards.length > 2) {
        for (let i = 0; i < 2; i++) {
            let choosenCard = $(`#${openCards[i]}`)[0];
            $(choosenCard).removeClass('open show');
        }
        openCards.splice(0, 2);
    }
}

/**
 * Display the card's symbol
 */
function showCard(evt) {
    $(evt).addClass('open show');
}

/**
 *  Add the card to a *list* of "open" cards and if the list already has another card, check to see if the two cards match.
 */
function checkCardsMatch(evt) {
    let indexOpenCard = openCards.indexOf(evt.id);
    if (openCards.length > 1) {
        let idOpenedCard = openCards[0];
        let firstChoosenCard = $(`#${idOpenedCard}`)[0];
        if (firstChoosenCard.firstChild.className === evt.firstChild.className) {
            $(evt).addClass('match');
            $(firstChoosenCard).addClass('match');
            openCards = [];
            matchCards.push(idOpenedCard);
            matchCards.push(evt.id);
            if (matchCards.length === cards.length) {
                this.showCongratulationsPopUp();
            }
        }
    }
}

/**
 * Call behaviors when user choose a card.
 */
function chooseCard(evt) {
    if (!gameInitialized) {
        this.startTimer();
    }

    if (openCards.indexOf(evt.id) > -1 || matchCards.indexOf(evt.id) > -1) {
        // Ignore
        return;
    }

    openCards.push(evt.id);

    this.hideOldCards();

    this.updateMoves();

    this.showCard(evt);

    this.checkCardsMatch(evt);
}

/**
 * If all cards have matched, display the winning message. 
 */
function showCongratulationsPopUp() {
    $('#myModal')[0].style.display = "block";
    $('#winningText').text(`With ${countMoves} Moves, ${numberOfStars} Stars and ${totalSeconds} seconds. Uhuuu!!`);
    clearInterval(timer);
}

/**
 * Display move counter on the page
 */
function showMoves() {
    $('#countMoves').text(`${countMoves} Moves`);
    this.updateStarRating();
}

/**
 * Increment the move counter.
 */
function updateMoves() {
    if (openCards.length == 2) {
        countMoves++;
        this.showMoves();
    }
}

/**
 * Update star rating according with number of moves.
 */
function updateStarRating() {
    if (countMoves > 40) {
        numberOfStars = 1;
    } else if (countMoves > 20) {
        numberOfStars = 2;
    }

    $('#stars').children().each(function () {
        this.remove();
    });

    for (let i = 0; i < numberOfStars; i++) {
        $('#stars').append(`<li><i class="fa fa-star"></i></li>`);
    }
}

function startTimer() {
    gameInitialized = true;
    startTime = new Date();
    timer = setInterval(function () {
        totalSeconds = Math.round((new Date - startTime) / 1000, 0);
        $('#timer').text(totalSeconds + " Seconds");
    }, 1000);
}

function startGame() {
    this.showMoves();

    this.shuffle(cards);
    // Create nested for to create rows and columns
    for (let i = 0; i < cards.length; i++) {
        $('#deck').append(`<li id="card_${i}" class="card card-size" onclick="chooseCard(this)"><i class="fa ${cards[i].type}"></i></li>`);
    }

    $('#myModal')[0].style.display = "none";
}

function restartGame() {
    gameInitialized = false;

    // Clear old rows and columns
    $('#deck').children().each(function () {
        this.remove();
    });

    openCards = [];
    matchCards = [];
    countMoves = 0;
    numberOfStars = 3;
    timer = undefined;

    this.startGame();
}

/**
 * Set up the winning modal.
 */
function initCongratulationsPopup() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

startGame();
initCongratulationsPopup();