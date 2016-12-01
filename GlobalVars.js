//Global vars
var imageTag = ""
var image_dir="card_images/"
var playerPlayed = ""

var p1 = new Player(GameConstants.HUMAN, GameConstants.PLAYER1)
var p2 = new Player(GameConstants.COMPUTER, GameConstants.PLAYER2)

p1.deckElement = document.getElementById(p1.id);
p1.battleField_primary = document.getElementById("battlefield1_primary");
p1.battleField_secondary = document.getElementById("battlefield1_secondary");


p2.deckElement = document.getElementById(p2.id);
p2.battleField_primary = document.getElementById("battlefield2_primary");
p2.battleField_secondary = document.getElementById("battlefield2_secondary");


var playerMsgElement = document.getElementById(GameConstants.PLAYERMSG);
var roundWinnerElement = document.getElementById(GameConstants.ROUNDWINNER);

// Display scores
p1.scoreElement = document.getElementById(GameConstants.P1SCORE);
p2.scoreElement = document.getElementById(GameConstants.P2SCORE);

p1.tieCardElement = document.getElementById("player1_downcard4");
p2.tieCardElement = document.getElementById("player2_downcard4");

//Assuming player1 starts for now.
var gameRound = new GameRound(p1.id, p1, p2); 