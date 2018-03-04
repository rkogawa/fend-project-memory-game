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

function showCard(evt) {
    $(evt.target).addClass('open show');
}

function chooseCard(evt) {
    if (openCards.length === 2) {
        for(let i = 0; i < openCards.length; i++) {
            let choosenCard = $(`#${openCards[i]}`)[0];
            $(choosenCard).removeClass('open show');
        }
        openCards = [];
    }

    showCard(evt);
    if (openCards.indexOf(evt.target.id) > -1) {
        $(evt.target).removeClass('open show');
        openCards.splice(openCards.indexOf(evt.target.id));
    } else if (openCards.length > 0) {
        let firstChoosenCard = $(`#${openCards[0]}`)[0];
        if (firstChoosenCard.firstChild.className === evt.target.firstChild.className) {
            $(evt.target).addClass('match');
            $(firstChoosenCard).addClass('match');
            openCards = [];
            countMatches += 2;
            if (countMatches === cards.length) {
                $('#myModal')[0].style.display = "block";
            }
        } else {
            openCards.push(evt.target.id);
        }
    } else {
        openCards.push(evt.target.id);
        // $('#myModal')[0].style.display = "block";
    }
}

function startGame() {
    // Clear old rows and columns
    $('#deck').children().each(function() {
        this.remove();
    });

    // let cards = this.getCards();
    this.shuffle(cards);
    // Create nested for to create rows and columns
    for (let i = 0; i<cards.length; i++) {
        $('#deck').append(`<li id="card_${i}" class="card"><i class="fa ${cards[i].type}"></i></li>`);
    }

    $('#myModal')[0].style.display = "none";
}

$('.restart').click(function(evt) {
    startGame();
});


function initListeners() {
    $('#deck').on('click', '.card', function(evt) {
        chooseCard(evt);
    });
}

startGame();
initListeners();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


         // Get the modal
         var modal = document.getElementById('myModal');
         
         // Get the <span> element that closes the modal
         var span = document.getElementsByClassName("close")[0];
         
         // When the user clicks on <span> (x), close the modal
         span.onclick = function() {
             modal.style.display = "none";
         }
         
         // When the user clicks anywhere outside of the modal, close it
         window.onclick = function(event) {
             if (event.target == modal) {
                 modal.style.display = "none";
             }
         }