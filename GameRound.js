var GameRound = function(startingTurn, player1, player2) {
    var currentTurn = startingTurn;
    var roundCount = 1;

    var p1 = player1;
    var p2 = player2;

    var isNewRound = false;
    var winner = null;      //winner of a round
    var winnerCards = [];

    function resetPlayerTurns() {
        p1.playedTurn = false;
        p2.playedTurn = false;
    }

    function bothPlayedCard() {
        return (p1.playedTurn && p2.playedTurn);
    }

    function isTie() {
        var cardsAreEqual = (p1.activeCard.value) == (p2.activeCard.value);

        return cardsAreEqual;
    }

    function bothPlayersCanPlayForTie() {
        return p1.hasMinNumberCardsForTie() && p2.hasMinNumberCardsForTie();
    }

    function nextTurn() {
        currentTurn = (currentTurn == GameConstants.PLAYER1) ? 
                    GameConstants.PLAYER2 : GameConstants.PLAYER1;

        if (bothPlayedCard()) {
            this.isNewRound = true;    
            resetPlayerTurns();
            roundCount++;
        } else {
            this.isNewRound = false;    
        }       
    }

    //if somebody won, then return pointer to player object
    //if no winner, return null
    function whoWon() {
        if (bothPlayedCard() && !isTie()) {
            winner = (p1.activeCard.value > p2.activeCard.value) ? p1 : p2;
            return winner;
        }
        return null;
    }

    function whoWonByCardCount() {
        winner = p1.totalCardCount() > p2.totalCardCount() ? p1 : p2
        return winner;
    }

    function whoLost() {
        return (winner === p1) ? p2 : p1;
    }    

    function whoseTurn() {
        return currentTurn;
    }

    function getCurrentPlayer() {
        return (currentTurn == p1.id) ? p1 : p2;
    }

    function getOtherPlayer() {
        return (currentTurn == p1.id) ? p2 : p1;   
    }

    function getCurrentPlayerNextCard() {
        player = getCurrentPlayer();
        card = player.active_deck.pop();
        winnerCards.push(card); 
        return card;
    }

    function count() {
        return roundCount;
    }

    function print() {
        console.log("Round: " + roundCount + ", Turn: " + currentTurn);
    }

    function awardCardsToWinner(player)
    {
        winnerCards.forEach(card) {
            player.discarded_deck.add(card);
        }
        winnerCards = [];
    }


    //Tie condition
    function evaluateTie() {
        Winner = null; 
        Loser = null;
        gameOver = false;
        
        //display faced down cards when tie
        backfaces = document.getElementsByClassName("tie_backface") //display
        for (var i = 0; i < backfaces.length; i++) {
            thisCard = backfaces[i];
            thisCard.style.visibility = "visible"
        }
        
        //add war cards to winning card array
        for (var j = 0; j < GameConstants.MIN_CARDS_FOR_TIE; j++) {
            p1.checkDecks();
            p2.checkDecks();

            swapDecks();
            p1.activeCard = p1.active_deck.pop();
            p2.activeCard = p2.active_deck.pop();
            winnerCards.push(p1.activeCard);
            winnerCards.push(p2.activeCard);
        }

        showCard(p1.activeCard, tieCardPlayer1);        //display
        showCard(p2.activeCard, tieCardPlayer2);
        
        if (p1.activeCard.value == p2.activeCard.value && !EitherPlayerHasLessThan4Cards() ) {
            updateRoundWinner("Tie!");
            console.log("Tie!");
            evaluateTie();            //recursive call
        } else if (p1.activeCard.value == p2.activeCard.value && EitherPlayerHasLessThan4Cards() ) {
            gameOver = true;
            Winner = (p1.active_deck.count() + p1.discarded_deck.count() > p2.active_deck.count() + p2.discarded_deck.count()) ? p1 : p2;
            Loser = (Winner === p1) ? p2 : p1;
        } else {
            Winner = (p1.activeCard.value > p2.activeCard.value) ? p1 : p2;
            Loser = (Winner === p1) ? p2 : p1;
            
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
------


    return {
        nextTurn: nextTurn,
        whoseTurn: whoseTurn,
        getCurrentPlayer: getCurrentPlayer,
        getOtherPlayer: getOtherPlayer,
        count: count,
        isNewRound: isNewRound,
        print: print,
        bothPlayedCard: bothPlayedCard,
        isTie: isTie,
        whoWon: whoWon,
        whoLost: whoLost,
        evaluateTie: evaluateTie,
        getCurrentPlayerNextCard: getCurrentPlayerNextCard,
        awardCardsToWinner: awardCardsToWinner
    }
}

