// Split shuffled deck into four hands of 13 cards
function splitCards(deck) {
	var i = 0;

	// Push cards to each "hand" array
	while (i != deck.length) {
		player1Hand.push(deck[i]);
		player2Hand.push(deck[(i+1)]);
		player3Hand.push(deck[(i+2)]);
		player4Hand.push(deck[(i+3)]);
		i+=4;
	}

	$('.player1Count').html("Player 1 Cards: " + player1Hand.length);
	$('.player2Count').html("Player 2 Cards: " + player2Hand.length);
	$('.player3Count').html("Player 3 Cards: " + player3Hand.length);
	$('.player4Count').html("Player 4 Cards: " + player4Hand.length);
	$('.result').html("");
}

// Deals cards
function deal() {
	
	//if a card is already in the slot, removes card. Also shows "New Game" button if hidden
	$('.player1Card').html("");
	$('.player2Card').html("");
	$('.player3Card').html("");
	$('.player4Card').html("");
	$('.newGame').show();

	//sets current card for each hand
	player1Card = player1Hand[0];
	player2Card = player2Hand[0];
	player3Card = player3Hand[0];
	player4Card = player4Hand[0];

	//creates an image element for the current card in each hand
	var img = document.createElement('img');
	var img2 = document.createElement('img');

	img.src = ("img/cards/" + playerHand[0] + ".png");
	img2.src = ("img/cards/" + compHand[0] + ".png");

	//adds card image to the card slot of the game board
	$('.playerCard').append(img).animateCss("flipInYRev");
	$('.compCard').append(img2).animateCss("flipInY");

	//calls compare function to compare current cards
	compare(playerCard, compCard);
}


// Compare 
function compare(player, comp) {	

//function to take cards from each deck and put into "war" array
function warToArray() {

	var cardStr = "";
	var length = 0;

	//if not able to draw 4 cards, draw as many as possible
	if (playerHand.length < 5 || compHand.length < 5) {

		//if computer has less than 4 cards
		if(playerHand.length > compHand.length) {
			length = compHand.length - 1;
		}

		//if the player hand has less than 4 cards
		else if (playerHand.length < compHand.length) {
			length = playerHand.length - 1;
		}
	}

	//if both decks have greater than four cards
	else {
		length = 3;		
	}

	//take the cards from each deck and push them to the war array
	for (var i = 0; i < length; i++) {
		warArray.push(playerHand[0]);
		playerHand.shift();
		warArray.push(compHand[0]);
		compHand.shift();
		cardStr += '<img src="img/cardback.jpg">';
	}

	//set up the War visual with relevant cards
	$(".playerWarFinal").html("<img src='img/cards/"+playerHand[0]+".png'>").animateCss("flipInYRev");
	$(".playerWarCards").html(cardStr);
	$(".compWarCards").html(cardStr);
	$(".compWarFinal").html("<img src='img/cards/"+compHand[0]+".png'>").animateCss("flipInY");

	//compare the new current card from each deck
	compareWar(playerHand[0], compHand[0]);
}


//function to compare current cards and allocate the war array correctly
function compareWar(player, comp) {
	
	//if player's War card value is greater than the computer's War card value, player wins the tie
	if((player % 13) > (comp % 13)) {
	
		//updates result section of the game board
		$('.result').html("Player wins!");
		
		//pushes entire war array to the back of the player's hand
		playerHand.push.apply(playerHand, warArray);

		//pushes both current cards (War cards) to back of the player's hand
		playerHand.push(comp);
		playerHand.push(player);
		
		//removes current card from both hands
		playerHand.shift();
		compHand.shift();
		
		//resets the war array to empty
		warArray.length = 0;

		setTimeout(function() {
			moveCards("playerWar");
			moveCards("player");
		}, 3000);

		setTimeout(function() {
			$("#warArea").hide();
		}, 3500);

		//update card count and check for a winner
		updateCount();
		checkWin();
	}

	//if computer's War card value is greater than the player's War card value, computer wins the tie
	else if ((player % 13) < (comp % 13)) {
		
		//update result section of the game board
		$('.result').html("Computer wins!");
		
		//pushes the entire war array to the back of the computer's hand
		compHand.push.apply(compHand, warArray);
		
		//pushes both current cards (War cards) to the back of the computer's hand
		compHand.push(player);
		compHand.push(comp);

		//removes the current cards from each hand
		playerHand.shift();
		compHand.shift();

		//resets the war array to empty
		warArray.length = 0;

		setTimeout(function() {
			moveCards("compWar");
			moveCards("comp");
		}, 3000);

		setTimeout(function() {
			$("#warArea").hide();
		}, 3500);

		//update card count and check for a winner
		updateCount();
		checkWin();
	}

	//if player's War card value is the same as the computer's War card value, call for another war
	else if ((player % 13) === (comp % 13))
		war();
}


//function to check if either player is out of cards (being a win for the other player)
function checkWin() {
	
	//if player is out of cards, computer wins
	if (playerHand.length == 0) {
		$(".result").html("The computer wins the game :(").animateCss("flipInX");

		//resets the card and deck image to make it seem like the player is out of cards
		$('.playerCard').html("");
		$('.playerDeck').html("");

		//hides the "deal" button, forces player to only start a new game
		$('.deal').hide();
	}

	//if computer is out of cards, player wins
	else if (compHand.length == 0) {
		
		$(".result").html("You won the game! :)").animateCss("flipInX");

		//resets the card and deck image to make it seem like the computer is out of cards.
		$('.compCard').html("");
		$('.compDeck').html("");

		//hides the "deal" button, forces the player to only start a new game
		$('.deal').hide();
	}
}

//function that hides the "how to play" screen and shows the game board
function play() {
	hideAll();
	$("#header").show().addClass("animated fadeInDown");
	$("#gameboard").show();
	playing = true;
}

//function to update the card count after every "deal" finishes
function updateCount() {
	$('.playCount').html("Player cards: " + playerHand.length);
	$('.compCount').html("Computer cards: " + compHand.length);
}

//simple function to hide big page elements, usually followed by showing other specific elements
function hideAll() {
	$("#jumbotron").hide();
	$("#gameboard").hide();
	$("#howToPlay").hide();
	$("#header").hide();
	$(".newGame").hide();
}

window.onload = function() {
	preloadImages();

	hideAll();
	$("#jumbotron").show();
	$("#howToPlay").show();
	fillArray();

	$("#year").html(new Date().getFullYear());
};

//custom function, used with animate.css to quickly add and then remove animation classes (once animation is finished)
//found here: https://github.com/daneden/animate.css
$.fn.extend({
	animateCss: function(animationName, callback) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
              callback();
            }
        });
        return this;
	}
});

//function to preload images into the browser cache for quicker loading during play
function preloadImages() {
	for (var i = 0; i < 52; i++) {
		var img = new Image();
		img.src = 'img/cards/'+i+'.png';
	}
}

/* function isValidPair(cards) {
    return cards[0].rank === cards[1].rank;
} */ // looked like you were trying to comment this out -MR

function handIsValid(cards) {
    const type = cards.length;
    switch(type) {
    case handTypes.PAIR:
        return isValidPair(cards);
    default:
        return true;
    }
}