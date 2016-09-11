//Card Class
var Card = function(value, name, suit) {
    var value = value;
    var name = name;
    var suit = suit;
    
    function print() {
        console.log("[Card: "+ name +" of " + suit +", value: "+ value +"]");
    }
    
    return {
        value: value,
        name: name,
        suit: suit,
        print: print
    }   
}

//Deck Class
//This is an example of how to simulate
//object-oriented programming in javascript

var Deck = function() {
    
    //The member variables
    names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king","ace"]
    values = [2,3,4,5,6,7,8,9,10,11, 12, 13, 14]
    suits= ["clubs", "diamonds", "hearts", "spades"]
    var cardArray = []    
            
    //class functions (need to be variables)
    function create_deck() {    
        cardArray=[]
        var v, s;
        for (s = 0; s < suits.length; s++) {
            for (v = 0; v < values.length; v++) {            
                value = values[v];
                name = names[v];
                suit = suits[s];
                card = new Card(value, name, suit);
                cardArray.push(card)
            }
        }        
    } //end fun
    
    function count() {
        return cardArray.length;
    }
    
    function print() {
        console.log("------------");
        console.log("Cards in Deck: " + count());
        console.log("------------");

        cardArray.forEach(function(card){
            card.print();
        });
        console.log("------------");
    }
    
    function shuffle() {
        highest_index = count() - 1;
        tempCards = []
        //create the spaces in the array
        cardArray.forEach(function(card) {
            tempCards.push(null)
        });
        
        //get a random index into the new deck
        //if that spot isn't empty, then find next closest spot to
        //put card.
        cardArray.forEach(function(card){
            low=0;
            high=highest_index;
            new_index =  Math.floor(Math.random()*(high - low+ 1 )+low); 
            
            if (tempCards[new_index] === null) {
                tempCards[new_index] = card;
            } else {
                new_index = (new_index + 1) > highest_index ? 0 : new_index+1;
                done = false;
                do {
                    if (tempCards[new_index] == null) {
                        tempCards[new_index] = card;    
                        done = true;
                    } else {
                        new_index = (new_index + 1) > highest_index ? 0 : new_index+1;                            
                    }
                } while (!done);
            }
        });
        cardArray = tempCards;    //overwrite the existing array        
    }
    
    function shuffle_N_Times(n) {
        for (var i = 0; i < n; i++) {
            shuffle();
        }
    }
    
    //how to expose class functions to
    //left value is the name of the fuction
    //right value is the name that is exposed, so it can be called  
    return {
        create_deck : create_deck,
        count: count,
        print: print,
        shuffle: shuffle,
        shuffle_N_Times: shuffle_N_Times
    };
}

//Basic tests of class

//d = Deck();
//d.create_deck();
//d.print();
//
//
//d.shuffle_N_Times(10);
//d.print();


