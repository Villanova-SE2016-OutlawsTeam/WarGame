// Player class -- specific player
var Player = function(type, id) {
    var id = id
    var type = type
    var activeCard;
    var playedTurn = false;

    var active_deck = new Deck()
    var discarded_deck = new Deck()

    function print() {
        console.log("id: " + id + ", type: " + type)
    }

    return {
        id: id,
        type: type,
        print: print,
        active_deck: active_deck,
        discarded_deck: discarded_deck,
        activeCard: activeCard,
        playedTurn: playedTurn
    }
}