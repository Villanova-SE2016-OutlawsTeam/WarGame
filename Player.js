var Player = function(name){
//	var deck = new Deck();
	var name = name;
	var score;

	function print(){
		console.log("Name: " + name);
	}

	return {
		print: print
	}
}

p = new Player("Mr. X");
p.print();
