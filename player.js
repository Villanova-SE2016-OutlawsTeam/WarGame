// General player information
var PlayerInfo = function() {
	var types = ["Human", "Computer"]
	var playerIDs = ["Player1", "Player2"]
	
	return {
        types: types,
        playerIDs: playerIDs      
    }
}();

// Player class -- specific player
var Player = function(type, id) {
	var this.id = id
	var this.type = type
	
	return {
		id: id,
		type: type}
}

// Player's deck of cards
var Hand(id) {
	var this.playerCards = [] 
	var this.wonCards = []
	
	function resetHand() {
		this.playerCards.length = 0;
		this.wonCards.length = 0;
	}
	
	function addCard(card, down, cardPile){
		this.cardPile.push(card);
	}
	
	function removeCard(cardPile) {
		var card = this.cardPile.pop();
		return card;
	}
	
	function countCards(cardPile) {
		return this.cardPile.length;
	}
	
	return {
		resetHand: resetHand,
		addCard: addCard,
		removeCard: removeCard,
		countCards: countCards
	}
	
}