// Player class -- specific player
var Player = function(type, id) {
    var id = id
    var type = type
    var activeCard;
    var activeBattleField;
    var playedTurn = false;

    var active_deck = new Deck()
    var discarded_deck = new Deck()

    function print() {
        console.log("id: " + id + ", type: " + type)
    }

    function nextCardFromDeck() {
        var card = null;

        if (active_deck.count() > 0) {
            card = active_deck.pop();    
        } else if (active_deck.count() == 0 && discarded_deck.count() > 0) {
            swapDecks();
            active_deck.shuffle();
            card = active_deck.pop();
        }

        if (card == null) {
            console.log("card is null here.")
        }

        return card;
    }

    function swapDecks() {
        console.log(id + " called swapDecks");
        
        var count = discarded_deck.count();
        for (var i = 0; i < count; i++) {
            card = discarded_deck.pop();
            active_deck.add(card);
        }
    }

    function totalCardCount() {
        return active_deck.count() + discarded_deck.count();
    }

    function hasEnoughToPlayRound() {
        return totalCardCount() >= gameConstants.MIN_CARDS_REQUIRED_PER_ROUND;
    }

    function hasEnoughToPlayTie() {
        return totalCardCount() >= gameConstants.MIN_CARDS_RQUIRED_FOR_TIE;
    }

    return {
        id: id,
        type: type,
        print: print,
        active_deck: active_deck,
        discarded_deck: discarded_deck,
        activeCard: activeCard,
        playedTurn: playedTurn,
        nextCardFromDeck: nextCardFromDeck,
        totalCardCount: totalCardCount,
        hasEnoughToPlayRound: hasEnoughToPlayRound,
        hasEnoughToPlayTie: hasEnoughToPlayTie
    }
}