

function dealDeck(event) {
    adjustPage(event);    

    starting_deck = new Deck()
    starting_deck.create_deck()
    starting_deck.shuffle()

    var deck_count = starting_deck.count()

    for (var i = 0; i < deck_count; i++) {
        card = starting_deck.pop()

        if (i % 2 == 0) {
            p1.active_deck.add(card)
        } else {
            p2.active_deck.add(card)
        }
    }

    updateClickListeners();
    updatePlayerMessage("Round: " + gameRound.count());
}


function updateClickListeners() {
    activePlayer = gameRound.getCurrentPlayer();
    otherPlayer = gameRound.getOtherPlayer();

    activePlayer.deckElement.addEventListener("click", cardClick);    
    otherPlayer.deckElement.removeEventListener("click", cardClick);
}

function playWholeRound() {
        console.log("Play Whole Round");
        player = gameRound.getCurrentPlayer();
        otherPlayer = gameRound.getOtherPlayer();

        d1_count = p1.totalCardCount();
        d2_count = p2.totalCardCount();

        function select_random_card() {
            options=["primary", "secondary"]
            low = 0;
            high = 1;
            chosen_index = Math.floor(Math.random()*(high - low+ 1 )+low);
            return options[chosen_index];
        }

        var card_min = GameConstants.MIN_CARDS_REQUIRED_PER_ROUND;

        if (player.id == GameConstants.PLAYER1) {
            if (d1_count >= card_min && d2_count >= card_min) {
                cardClick(select_random_card());
                cardClick(select_random_card());
                
            }
        } else {
            if (d2_count >= card_min) {
                cardClick(select_random_card());                    
            }            
        }           
}

function cardClick(optional_card_choice) {
    deck_info();

    if (gameRound.isNewRound) {
        updatePlayerMessage("Round: " + gameRound.count());
        p1.activeCard = null;
        p2.activeCard = null;
        clearCardsFromBattleField();
    }

    var player = gameRound.getCurrentPlayer();

    if (player.totalCardCount == 0) {
        alert ("Error: A player's deck is empty, and game is not over.");
        return;
    }    
    
    player.activeCard = player.serveCard();
    if (!player.activeCard) {player.activeCard = player.fixDeck_thenServeCard();}

    if (player.totalCardCount() == 0) {
      player.deckElement.style.visibility = "hidden";
    }  

    showCardBackFace(player.battleField_secondary)
    showCard(player.activeCard, player.battleField_primary);

    //Turn off the usual listener, and turn on listener to decide on which card to use
    player.deckElement.removeEventListener("click", cardClick);
    player.battleField_primary.addEventListener("click", cardClick_decideOnCardToPlay);
    player.battleField_secondary.addEventListener("click", cardClick_decideOnCardToPlay);
    

    //this is for the 'play whole round' button
    //optional_card_choice will be an object if 
    //something was clicked on screen vs. a string passed in (from playWholeRound)
    if (typeof optional_card_choice != "object") {
        cardClick_Continued(optional_card_choice);
    }
}

//only used for gui interface
function cardClick_decideOnCardToPlay(event) {    
    if (event.target.className == "card_backface") {
        cardClick_Continued("secondary");       
    } else {
        cardClick_Continued("primary");       
    }
}

function cardClick_Continued(chosen_card) {
        player = gameRound.getCurrentPlayer();

        //Determine which of the two given cards
        //the player has chosen and make that card the
        //active card.
        
        if (chosen_card == "primary") {
            player.activeBattleField = player.battleField_primary;                        
        
        } else if (chosen_card == "secondary") {
            player.activeBattleField = player.battleField_secondary;
            //the first card shown was not chosen, so it was not played
            //it will go back into the discarded deck at end of round
            player.cards_notPlayed.add(player.activeCard);  

            //grab a new card
            player.activeCard = player.serveCard();
            if (!player.activeCard) {player.activeCard = player.fixDeck_thenServeCard();}                        
            if (player.isOutOfCards()) {
              player.deckElement.style.visibility = "hidden";
            }  
                       
            showCard(player.activeCard, player.battleField_secondary);
            showCardBackFace(player.battleField_primary);
        } 

        //remove listeners before continuing the round
        player.battleField_primary.removeEventListener("click", cardClick_decideOnCardToPlay);
        player.battleField_secondary.removeEventListener("click", cardClick_decideOnCardToPlay);

        player.cards_played.add(player.activeCard);
        player.playedTurn = true;

        
        if (!gameRound.bothPlayedCard()) {
            gameRound.nextTurn();      
            updateClickListeners();
            return;
        }


        var winner;
        if (gameRound.bothPlayedCard()) {
           winner = determineRoundWinner();
        } else {
            
        }

        //----------------------------


        
        
        var loser = getLoser(winner);
        

        showWinner(winner, loser);
        gatherWinnings(winner, loser);
        card_cleanup(winner, loser);          
        updateScores();
             
        if (gameRound.isGameOver()) {
            endGameCleanup();
            return;
        }               

        deck_info();
        gameRound.nextTurn();          
        updateClickListeners(); 

        //control back to browser here
}

    //disburses winnings to winner's
    //discarded deck
    function gatherWinnings(winner, loser) {
        var card;

        while (loser.cards_played.count() > 0) {
            card = loser.cards_played.pop();
            winner.discarded_deck.add(card);
        }

        while (winner.cards_played.count() > 0) {
            card = winner.cards_played.pop();
            winner.discarded_deck.add(card);
        }
    }


    //puts cards taken from deck into the 
    //discarded deck.
    function card_cleanup(winner, loser) {
        var card;
        while (loser.cards_notPlayed.count() > 0) {
            card = loser.cards_notPlayed.pop();
            loser.discarded_deck.add(card);
        }

        while (winner.cards_notPlayed.count() > 0) {
            card = winner.cards_notPlayed.pop();
            winner.discarded_deck.add(card);
        }
    } 

    function endGameCleanup() {
        if (loser.active_deck.count() == 0) {
            loser.deckElement.style.visibility = "hidden";
        }
        document.getElementById("playWholeRound").style.visibility = "hidden";
        updatePlayerMessage("GAME OVER!");  

        //disable all listeners  
    }



    //return the winner of the round
    function determineRoundWinner() {

        var winner;    
        var RoundIsTied = gameRound.isTie();
        var RoundHasClearWinner = !RoundIsTied;

        if (RoundHasClearWinner) {
            winner = gameRound.whoWon();
        } else if (RoundIsTied) {
            updateRoundWinner("Tie!");
            console.log("Tie!");                

            var bothPlayersHaveEnoughCardsToPlayTie = !LessThan4Cards();
            if (bothPlayersHaveEnoughCardsToPlayTie) {                    
                document.getElementById("playWholeRound").style.visibility = "hidden";
                tie = new tieBreaker();            
                winner = tie.Winner;            
                gameRound.gameOver = tie.gameOver;
            } else {
                winner = p1.totalCardCount() > p2.totalCardCount() ? p1 : p2;            
                gameRound.gameOver = true;
            }     
        }

        return winner;
    } 


    function deck_info() {
        var p1_msg, p2_msg;
        var p1_total = p1.active_deck.count() +
            p1.discarded_deck.count() + 
            p1.cards_played.count() + 
            p1.cards_notPlayed.count();

        var p2_total = p2.active_deck.count() +
            p2.discarded_deck.count() + 
            p2.cards_played.count() + 
            p2.cards_notPlayed.count();


        p1_msg = "Player1 Active: " + p1.active_deck.count();
        p1_msg += ", Discarded: " + p1.discarded_deck.count();
        p1_msg += ", Played: " + p1.cards_played.count();
        p1_msg += ", Not_Played: " + p1.cards_notPlayed.count();
        p1_msg += " -> Total: " + p1_total;

        p2_msg = "Player2 Active: " + p2.active_deck.count();
        p2_msg += ", Discarded: " + p2.discarded_deck.count();
        p2_msg += ", Played: " + p2.cards_played.count();
        p2_msg += ", Not_Played: " + p2.cards_notPlayed.count();
        p2_msg += " -> Total: " + p2_total;

        console.log(p1_msg);
        console.log(p2_msg);
        console.log("Deck Total: " + Number(p1_total + p2_total));
    }

    function getLoser(winner) {
        return (winner === p1) ? p2 : p1;
    }
