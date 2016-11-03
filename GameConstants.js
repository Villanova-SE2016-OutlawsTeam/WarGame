//Constants so we don't use strings directly,
//and we'll get an error if we mistype this (which is good).
var GameConstants = function() {
    var HUMAN = "human"
    var COMPUTER = "computer"
    var PLAYER1 = "player1"
    var PLAYER2 = "player2"
    var BATTLEFIELD1 = "battlefield1"
    var BATTLEFIELD2 = "battlefield2"
    var PLAYERMSG = "playerMessage"
    var ROUNDWINNER = "roundWinner"
    
    return {
        HUMAN: HUMAN,
        COMPUTER: COMPUTER,
        PLAYER1: PLAYER1,
        PLAYER2: PLAYER2,
        BATTLEFIELD1: BATTLEFIELD1,
        BATTLEFIELD2: BATTLEFIELD2,
        PLAYERMSG: PLAYERMSG,
        ROUNDWINNER: ROUNDWINNER
    }
}();
