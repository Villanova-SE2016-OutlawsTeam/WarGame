// General player information
var PlayerInfo = function() {
    var HUMAN = "human"
    var COMPUTER = "computer"
    var PLAYER1 = "player1"
    var PLAYER2 = "player2"
    
    return {
        HUMAN: HUMAN,
        COMPUTER: COMPUTER,
        PLAYER1: PLAYER1,
        PLAYER2: PLAYER2
    }
}();

// Player class -- specific player
var Player = function(type, id) {
    var id = id
    var type = type

    var active_deck = new Deck()
    var discarded_deck = new Deck()

    function print() {
        console.log("id: " + id + ", type: " + type)
    }

    // function add_card(card) {

    // }
        
    return {
        id: id,
        type: type,
        print: print,
        active_deck: active_deck,
        discarded_deck: discarded_deck
    }
}
