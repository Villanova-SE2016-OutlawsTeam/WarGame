//Code for dealing with Tie Condition

var tieBreaker = function() {
    console.log("tie breaker")
    Winner = null; 
    Loser = null;
    gameOver = false;
    
    //display faced down cards when tie
    backfaces = document.getElementsByClassName("tie_backface")
    for (var i = 0; i < backfaces.length; i++) {
        thisCard = backfaces[i];
        thisCard.style.visibility = "visible"
    }
    
    //add war cards to winning card array
     for (var j = 0; j < gameConstants.NUM_CARDS_PER_TIE; j++) {
        p1.activeCard = p1.serveCard();
        if (!p1.activeCard) {p1.activeCard = fixDeck_thenServeCard();}
        p1.served_active_deck.add(p1.activeCard);

        p2.activeCard = p2.serveCard();
        if (!p2.activeCard) {p2.activeCard = fixDeck_thenServeCard();}
        p2.served_active_deck.add(p2.activeCard);        
    }

    // display face up cards
    showCard(p1.activeCard, p1.tieCardElement);
    showCard(p2.activeCard, p2.tieCardElement);
    
    // handle nested ties
    if (p1.activeCard.value == p2.activeCard.value) {
        updateRoundWinner("Tie!");
        console.log("Nested Tie!");
        
        if (!LessThan4Cards()) {
            addRow();
            tieBreaker();
        } else {
            gameOver = true;
            Winner = (p1.active_deck.count() + p1.discarded_deck.count() > p2.active_deck.count() + p2.discarded_deck.count()) ? p1 : p2;
            Loser = getLoser(Winner);
        }
    } else {
        Winner = (p1.activeCard.value > p2.activeCard.value) ? p1 : p2;
        Loser = getLoser(Winner);
        
        for(var i=0; i<winnerCards.length; i++){
            console.log(winnerCards[i].value);
        }
    }
    
    document.getElementById("playWholeRound").style.visibility = "visible";
    return {
        Winner: Winner,
        Loser: Loser,
        gameOver: gameOver
    }

}

function addRow() {
    console.log("add row");
/* Inserts a row into the tieTable */
    var table = document.getElementById("tieTable");
    var newRow = table.insertRow(0);
    
    // Create new cells for the row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);
    var cell8 = newRow.insertCell(7);
    var cell9 = newRow.insertCell(8);
    
    // define classes for the new cells
    cell1.classList.add("tie_player1");
    cell2.classList.add("tie_player1");
    cell3.classList.add("tie_player1");
    cell4.classList.add("tie_player1");
    cell5.classList.add("col3");
    cell6.classList.add("tie_player2");
    cell7.classList.add("tie_player2");
    cell8.classList.add("tie_player2");
    cell9.classList.add("tie_player2");
    
    // define ids for the new cells
    cell4.id = 'player1_downcard4';
    cell5.id = 'land';
    cell6.id = 'player2_downcard4';
    
    // add content to new table cells
    cell1.innerHTML = '<img id="player1_downcard1" src="card_images/backface.png" class="tie_backface">'
    cell2.innerHTML = '<img id="player1_downcard2" src="card_images/backface.png" class="tie_backface">'
    cell3.innerHTML = '<img id="player1_downcard3" src="card_images/backface.png" class="tie_backface">'
    cell4.innerHTML = ''
    cell5.innerHTML = ''
    cell6.innerHTML = ''
    cell7.innerHTML = '<img id="player2_downcard1" src="card_images/backface.png" class="tie_backface">'
    cell8.innerHTML = '<img id="player2_downcard2" src="card_images/backface.png" class="tie_backface">'
    cell9.innerHTML = '<img id="player2_downcard3" src="card_images/backface.png" class="tie_backface">'
    
    // new location for the face up cards
    tieCardPlayer1 = document.getElementById("tieTable").getElementsByTagName('tr')[0].getElementsByTagName('td')[3];
    tieCardPlayer2 = document.getElementById("tieTable").getElementsByTagName('tr')[0].getElementsByTagName('td')[5];
}


// determines if one of the players has less than 4 cards left
function LessThan4Cards() {
    return p1.hasLessCardsThan(GameConstants.NUM_CARDS_PER_TIE) ||
           p2.hasLessCardsThan(GameConstants.NUM_CARDS_PER_TIE);
}