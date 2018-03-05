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
let countMatches = 0;
let countMoves = 0;
let numberOfStars = 3;
let totalSeconds = 0;
let timer;

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
    if (openCards.length === 2) {
        for (let i = 0; i < openCards.length; i++) {
            let choosenCard = $(`#${openCards[i]}`)[0];
            $(choosenCard).removeClass('open show');
        }
        openCards = [];
    }
}

/**
 * Display the card's symbol
 */
function showCard(evt) {
    $(evt.target).addClass('open show');
}

/**
 *  Add the card to a *list* of "open" cards and if the list already has another card, check to see if the two cards match.
 */
function checkCardsMatch(evt) {
    let indexOpenCard = openCards.indexOf(evt.target.id);
    if (indexOpenCard > -1) {
        $(evt.target).removeClass('open show');
        openCards.splice(indexOpenCard);
    } else if (openCards.length > 0) {
        let firstChoosenCard = $(`#${openCards[0]}`)[0];
        if (firstChoosenCard.firstChild.className === evt.target.firstChild.className) {
            $(evt.target).addClass('match');
            $(firstChoosenCard).addClass('match');
            openCards = [];
            countMatches += 2;
            if (countMatches === cards.length) {
                this.showCongratulationsPopUp();
            }
        } else {
            openCards.push(evt.target.id);
        }
    } else {
        openCards.push(evt.target.id);
    }
}

/**
 * Call behaviors when user choose a card.
 */
function chooseCard(evt) {
    this.updateMoves();

    this.hideOldCards();

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
    countMoves++;
    this.showMoves();
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

function startGame() {
    // Clear old rows and columns
    $('#deck').children().each(function () {
        this.remove();
    });

    startTime = new Date();
    timer = setInterval(function () {
        totalSeconds = Math.round((new Date - startTime) / 1000, 0);
        $('#timer').text(totalSeconds + " Seconds");
    }, 1000);

    countMoves = 0;
    numberOfStars = 3;
    this.showMoves();

    this.shuffle(cards);
    // Create nested for to create rows and columns
    for (let i = 0; i < cards.length; i++) {
        $('#deck').append(`<li id="card_${i}" class="card"><i class="fa ${cards[i].type}"></i></li>`);
    }

    $('#myModal')[0].style.display = "none";
}

/**
 * Set up restart icon.
 */
$('.restart').click(function (evt) {
    startGame();
});


/**
 * Set up the event listener for a card.
 */
function initListeners() {
    $('#deck').on('click', '.card', function (evt) {
        chooseCard(evt);
    });
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
initListeners();
initCongratulationsPopup();