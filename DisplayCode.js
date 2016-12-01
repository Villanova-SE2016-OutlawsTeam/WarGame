//Adjust the page after the War button was removed.
function adjustPage(event) {
    //removing the wargame image
    event.target.remove(); 

    //making the backfaces visible for each player
    backfaces = document.getElementsByClassName("backface")
    for (var i = 0; i < backfaces.length; i++) {
        thisCard = backfaces[i];
        thisCard.style.visibility = "visible"
    }

    document.getElementById("playWholeRound").style.visibility = "visible";
}

function updatePlayerMessage(msg) {
    playerMsgElement.innerHTML = msg;
}

function updateRoundWinner(msg) {
    roundWinnerElement.innerHTML = msg;
}

function updateScores() {
    p1.scoreElement.innerHTML = "Player 1 - " + p1.totalCardCount() + " cards";
    p2.scoreElement.innerHTML = "Player 2 - " + p2.totalCardCount() + " cards";
}

function showCard(card, destElem) {
    var card_img_file = image_dir + card.id + ".png";
    var imageTag = "<img src='" + card_img_file + "' class='card_regular' id='" + card.id + "' />";
    destElem.innerHTML = imageTag;
    destElem.style.visibility = "visible";
}

function showCardBackFace(destElem) {
    var card_img_file = "card_images/backface.png";
    var imageTag = "<img src='" + card_img_file + "' class='card_backface' />";
    destElem.innerHTML = imageTag;
    destElem.style.visibility = "visible";
}

function clearCardsFromBattleField() {
    // removes extra rows from tieTable if applicable
    while (document.getElementById("tieTable").rows.length > 1) {
        document.getElementById("tieTable").deleteRow(0);
    }
    
    tieCardPlayer1 = document.getElementById("player1_downcard4");
    tieCardPlayer2 = document.getElementById("player2_downcard4");
    
    backfaces = document.getElementsByClassName("tie_backface")
    for (var i = 0; i < backfaces.length; i++) {
        thisCard = backfaces[i];
        thisCard.style.visibility = "hidden"
    }
    
    p1.battleField_primary.style.visibility = "hidden";
    p1.battleField_secondary.style.visibility = "hidden";

    p2.battleField_primary.style.visibility = "hidden";
    p2.battleField_secondary.style.visibility = "hidden";

    tieCardPlayer1.innerHTML = "";
    tieCardPlayer2.innerHTML = "";
}


function showWinner(winner, loser) {
    updateRoundWinner("Winner: " + winner.id);
    console.log("Round " + gameRound.count() + ": Winner: " + winner.id + ", Loser: " + loser.id);

    //highlight the winner's card
    var winner_element = document.getElementById(winner.activeCard.id); //doing this way to find winning tie card.
    var glow_color = "red"
    winner_element.style["border-color"] = glow_color;
    winner_element.style["border-style"] = "solid";
    winner_element.style["border-width"] = "10px";    
}