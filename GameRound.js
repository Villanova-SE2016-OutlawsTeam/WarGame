var GameRound = function(startingTurn, player1, player2) {
    var currentTurn = startingTurn;
    var roundCount = 1;

    var p1 = player1;
    var p2 = player2;

    var isNewRound = false;
    var winner = null;      //winner of a round
    var gameOver = false;

    function resetPlayerTurns() {
        p1.playedTurn = false;
        p2.playedTurn = false;
    }

    function bothPlayedCard() {
        return (p1.playedTurn && p2.playedTurn);
    }

    function isTie() {
        return (p1.activeCard.value) == (p2.activeCard.value);
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

    function count() {
        return roundCount;
    }

    function print() {
        console.log("Round: " + roundCount + ", Turn: " + currentTurn);
    }

    function isGameOver() {
        var eitherPlayerOutOfCards = p1.isOutOfCards() || p2.isOutOfCards(); 

        if (eitherPlayerOutOfCards) {
            gameOver = true;
        }

        return gameOver;
    }

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
        gameOver: gameOver,
        isGameOver: isGameOver
    }
}

