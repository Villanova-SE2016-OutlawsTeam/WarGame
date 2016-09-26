//Deck Class Tests

QUnit.test( "01. Deck Class, Basic Tests", function( assert ) {
      //var value = "hello";
      //assert.equal( value, "hello", "We expect value to be hello" );
      
      var d1 = new Deck();         
      assert.equal(d1.count(), 0, "new Deck(), 0 cards expected before running create_deck()." );

      d1.create_deck();
      assert.equal(d1.count(), 52, "new Deck(), 52 cards expected after running create_deck()." );

      card = d1.pop();
      assert.equal(d1.count(), 51, "51 cards expected after running pop() -> card." );      

      d1.add(card);
      assert.equal(d1.count(), 52, "52 cards expected after running add(card)." ); 

      // card = d1.peek();
      // assert.equal(d1.count(), 52, "52 cards expected after running peek() -> card." );       
});

//This may be so basic that it is not worth having
QUnit.test( "02. Test Invariants of first Card Object from deck", function( assert ) {
      //var value = "hello";
      //assert.equal( value, "hello", "We expect value to be hello" );
      
      var d1 = new Deck();         
      d1.create_deck();

      var card = d1.pop(); // get one card

      //id should be a string
      assert.equal(typeof card.id, "string", "card.id should be a string type." );
      
      //value should be number
      assert.equal(typeof card.value, "number", "card.value should be a number type." );

      //name should be string
      assert.equal(typeof card.name, "string", "card.name should be string type." );

      //suit should be string
      assert.equal(typeof card.suit, "string", "card.suit should be string type." );
});

function allCardsHaveValues(thisDeck) {
    deck_count = thisDeck.count();
    
    var hasValues = true;

    for (var i = 0; i < deck_count; i++) {
        card = thisDeck.pop()
        hasValues &= typeof card.id === "string" &&
                  typeof card.value === "number" &&
                  typeof card.name === "string" &&
                  typeof card.suit === "string";
        
        if (hasValues != true) {
            // console.log("got here")
            break;
        }
    }      
    return hasValues;
}    

QUnit.test( "03. Test All Cards in Deck", function( assert ) {
    //var value = "hello";
    //assert.equal( value, "hello", "We expect value to be hello" );

    var d1 = new Deck();         
    d1.create_deck();

    //id should be a string
    assert.equal(allCardsHaveValues(d1), true, "All cards in deck should pass test 2." );      

    card={}
    d1.add(card)
    assert.equal(allCardsHaveValues(d1), false, "Adding invalid card, expecting this test to fail." );      

});

//From the requirements:
// 52 cards in the deck
// 4 suits: clubs, hearts, diamonds, and spades
// Cards are numbers 1-10, jack, queen, king, and ace

QUnit.test( "04. Test that the right cards are in the deck.", function( assert ) {
    var d1 = new Deck();         
    d1.create_deck();

    //exactly one of each card should appear in deck
    var suits = CardInfo.suits
    var names = CardInfo.names

    var allEqualToOne = false;

    // init a dictionary with count of 0 for each expected card
    card_count = {};
    suits.forEach(function(suit) {
        names.forEach(function (name) {
            var card_id = suit + "_" + name;
            card_count[card_id] = 0;
        });
    });    

    //traverse deck, and add item to this dictionary.
    deck_count = d1.count()
    for (var i = 0; i < deck_count; i++) {
        card = d1.pop();
        card_count[card.id]++;
    }

    //test that all entries of test dictionary is 1
    var allEqualToOne = false;
    for (var card_id in card_count) {
        allEqualToOne = (card_count[card_id] == 1);
        if (allEqualToOne == false) {break;}
    }
 
    //id should be a string
    assert.equal(allEqualToOne, true, "The deck should exactly: cards 2 to ace for each of the 4 suits (52 cards)." );      
});

