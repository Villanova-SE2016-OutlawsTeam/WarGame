// Player class -- specific player
var Player = function(type, id) {
    var id = id
    var type = type
    
    var activeCard;     //the card used to determine round win
    var activeBattleField;
    var playedTurn = false;

    var active_deck = new Deck()
    var discarded_deck = new Deck()
    
    //holding onto references of cards that were served
    var cards_played = new Deck()       //could be winnings of other player
    var cards_notPlayed = new Deck()    //to go back into discarded deck

    var scoreElement;
    var tieCardElement;
    var deckElement;
    
    function print() {
        console.log("id: " + id + ", type: " + type)
    }

    //return a false if no more cards can be served from
    //the active deck
    //save served cards in the served_deck
    function serveCard() {
        if (active_deck.count() <= 0) {
            return false;
        }

        var card = active_deck.pop();
        return card;
    }

    function fixDeck_thenServeCard() {
        makeDiscardedDeckActive();
        var card = active_deck.pop();
        return card;   
    }

    //move all cards from discarded deck to active deck
    //discarded deck should then be zero.
    function makeDiscardedDeckActive() {       
        while (discarded_deck.count() > 0) {
            active_deck.add(discarded_deck.pop());
        }

        active_deck.shuffle();
    }

    function totalCardCount() {
        return active_deck.count() + discarded_deck.count();
    }

    function hasMoreCardsThan(num_cards) {
        return totalCardCount() >= num_cards;
    }

    function hasLessCardsThan(num_cards) {
        return totalCardCount() < num_cards;
    }

    function isOutOfCards() {
        return totalCardCount() == 0;
    }

    return {
        id: id,
        type: type,
        print: print,
        active_deck: active_deck,
        discarded_deck: discarded_deck,        
        cards_played: cards_played,
        cards_notPlayed: cards_notPlayed,        
        activeCard: activeCard,
        playedTurn: playedTurn,
        serveCard: serveCard,
        totalCardCount: totalCardCount,
        makeDiscardedDeckActive: makeDiscardedDeckActive,
        fixDeck_thenServeCard: fixDeck_thenServeCard,
        hasMoreCardsThan: hasMoreCardsThan,
        hasLessCardsThan:hasLessCardsThan,
        isOutOfCards: isOutOfCards
    }
}