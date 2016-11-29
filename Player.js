// Player class -- specific player
var Player = function(type, id) {
    var id = id
    var type = type
    var activeCard;
    var playedTurn = false;

    var active_deck = new Deck()
    var discarded_deck = new Deck()

    function totalCardCount() {
        return active_deck.count() + discarded_deck.count();
    }

    function print() {
        console.log("id: " + id + ", type: " + type)
    }

    function hasMinNumberCardsForTie() {
        return totalCardCount() >= GameConstants.MIN_CARDS_FOR_TIE;
    }

    function hasMinNumberCardsForRound() {
        return totalCardCount() >= GameConstants.MIN_CARDS_FOR_ROUND;   
    }

    function checkDecks()
    {
        if (active_deck.count() == 0) {
            active_deck = discarded_deck;
            active_deck.shuffle();
            discarded_deck = new Deck();
        } 
    }

    return {
        id: id,
        type: type,
        print: print,
        active_deck: active_deck,
        discarded_deck: discarded_deck,
        activeCard: activeCard,
        playedTurn: playedTurn,
        totalCardCount: totalCardCount,
        hasMinNumberCardsForTie: hasMinNumberCardsForTie,
        hasMinNumberCardsForRound: hasMinNumberCardsForRound,
        checkDecks: checkDecks   
    }
}