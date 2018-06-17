var ctx;
var canvasWidth = 1450;
var gameFinished = 0;
var canvasHeight = 600;
var HandHeight = 500;
var prevHandHeight = 260;
var prevHandPos = 550;
var SelectShift = 20;
var cardWidth = 144;
var cardHeight = 208;
var handPos = 350;
var cardShift = 50;
var Score1 = 0, Score2 = 0, Score3 = 0, Score4 = 0;
var CGScore1 = 0, CGScore2 = 0, CGScore3 = 0, CGScore4 = 0;
var opp1left = 1300; var opp1top = 100;
var opp2left = 529; var opp2top = 50;
var opp3left = 100; var opp3top = 100;
var o1l = opp1left; var o1t = opp1top;
var o2l = opp2left; var o2t = opp2top;
var o3l = opp3left; var o3t = opp3top;
var timer;
var oppCardWidth = 87;
var oppCardHeight = 125;
var oppCardShift = 25;
var finishedDealing = 0;
var passCounter = 0;
var backOfCard = new Image();
backOfCard.src = "./img/cardBack.png";
var count = 0;
var plyrsGo;
var dealFirst = 1;
var control = 0;
var playersHand = []; //stores player's current hand.
var oppHand1 = [];
var oppHand2 = [];
var oppHand3 = [];
var selectedHand = [];
var previousHand = [];
var sortInd = 1;
var deck = [];

for(var i=0; i<52; i++) {
	deck[i] = (i+1);
}

function init() { //start game function.
	ctx = document.getElementById('gameCanvas').getContext('2d');
	newGame();
}

function newGame() {
	gameFinished = 0;
	finishedDealing=0;
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	but = document.getElementById("newgame");
	but.style.visibility = "hidden";
	passCounter=0;
	playersHand=[]; oppHand1=[]; oppHand2 = []; oppHand3 = []; selectedHand = [];
	CGScore1 =0; CGScore2=0; CGScore3=0; CGScore4=0;
	shuffleAndDeal();
	initDraw();
	firstMove(); //first move is done automatically. Determine who has the 3 of clubs and plays it.
	drawPlayersHand();
	updatePlyrsGo();
}

function firstMove() {
	var whoHas3D; //1,2,3 or 4.
	for(var i=0; i<13; i++) {
		if(playersHand[i]==1) {
			whoHas3D = 1;
			playersHand.splice(i,1);
			plyrsGo = 2;
			previousHand = [1];
			drawPrevHand();
			return;
		} else if(oppHand1[i]==1) {
			whoHas3D = 2;
			oppHand1.splice(i,1);
			plyrsGo = 3;
			previousHand = [1];
			drawPrevHand();
			return;
		} else if(oppHand2[i]==1) {
			whoHas3D = 3;
			oppHand2.splice(i,1);
			plyrsGo = 4;
			previousHand = [1];
			drawPrevHand();
			return;
		} else if(oppHand3[i]==1) {
			whoHas3D;
			oppHand3.splice(i,1);
			plyrsGo = 1;
			previousHand = [1];
			return;
		}
	}
	
}

function initDraw() { //"show" cards being dealt

	timer = setInterval(nextCard,70);
}

function nextCard() {
	if(dealFirst==1 && count == 13) {
		clearInterval(timer);
		finishedDealing=1;
		drawOpponentsHands();
		drawPrevHand();
		drawPlayersHand();
		
		return;
	}
	if(dealFirst==1) {
		cardNoId = "pc"+(count+1);
		card = document.getElementById(cardNoId);
		card.innerHTML = ("<img src='./img/"+String(playersHand[count])+".png' width='"+String(cardWidth)+"' height='"+String(cardHeight)+"'/>");
		card.style.left = String(handPos + count*cardShift)+"px";
		card.style.width = String(cardWidth)+"px";
		card.style.height = String(cardHeight) + "px";
		card.style.visibility = "visible";
		card.style.zIndex = String(count);
		card.style.top = String(HandHeight) + "px";
		dealFirst++; count++;
	} else if(dealFirst==2) {
		ctx.save();
		ctx.translate(o1l+oppCardWidth/2,o1t+oppCardHeight/2);
		ctx.rotate(Math.PI/2);
		ctx.translate(-o1l-oppCardWidth/2,-o1t-oppCardHeight/2);
		ctx.drawImage(backOfCard,o1l,o1t,oppCardWidth,oppCardHeight);
		ctx.restore();
		o1t += oppCardShift;
		dealFirst++;
	} else if(dealFirst==3) {
		ctx.drawImage(backOfCard,o2l,o2t,oppCardWidth,oppCardHeight);
		o2l += oppCardShift;
		dealFirst++;
	} else if(dealFirst==4) {
		ctx.save();
		ctx.translate(o3l+oppCardWidth/2,o3t+oppCardHeight/2);
		ctx.rotate(-Math.PI/2);
		ctx.translate(-o3l-oppCardWidth/2,-o3t-oppCardHeight/2);
		ctx.drawImage(backOfCard,o3l,o3t,oppCardWidth,oppCardHeight);
		ctx.restore();
		o3t += oppCardShift;
		dealFirst = 1;
	}
	
}

function shuffleAndDeal() {
	//do a "fisher-yates" shuffle on deck
	shuffle(deck);
	//Assign random hands to players
	// NEED TO ADD CODE THAT PUSHES THESE DECKS TO THE DATABASE!
	for(var i=0; i<13; i++) {
		playersHand.push(deck[i]);
		oppHand1.push(deck[i+13]);
		oppHand2.push(deck[i+26]);
		oppHand3.push(deck[i+39]);
	}

	// first, take a hand JSON.stringify it
	//JSON.stringify(playersHand)
}

function shuffle(array) {
	var i = 0;
    var j = 0;
    var temp = null;

	for (i = array.length - 1; i > 0; i -= 1) {
		j = Math.floor(Math.random() * (i + 1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function updatePlyrsGo() {
	temp = document.getElementById("whosgo");
	if(plyrsGo == 1) {
		if(control) {
			temp.textContent="It's your turn. You have control!";
		} else {
			temp.textContent="It's your turn!";
		}
	} else {
		if(control) {
			temp.textContent="It is P"+String(plyrsGo)+"'s turn. They have control.";
		} else {
			temp.textContent="It is P"+String(plyrsGo)+"'s turn.";
		}
	}
}

function drawPrevHand() {
	if(finishedDealing == 0) return;
	for(var i=0; i<previousHand.length; i++) {
		cardNoId = "prev"+(i+1);
		card = document.getElementById(cardNoId);
		card.innerHTML = ("<img src='./img/"+String(previousHand[i])+".png' width='"+String(cardWidth)+"' height='"+String(cardHeight)+"'/>");
		card.style.width = String(cardWidth)+"px";
		card.style.height = String(cardHeight) + "px";
		card.style.left = String(prevHandPos + i*cardShift)+"px";
		card.style.top = String(prevHandHeight) + "px";
		card.style.visibility = "visible";
	}
	for(var i=previousHand.length; i<5; i++) {
		cardNoId = "prev"+(i+1);
		card = document.getElementById(cardNoId);
		card.style.visibility = "hidden";
	}
}
		
function drawPlayersHand() {
	if(finishedDealing == 0) return;
	for(var i=0; i<playersHand.length; i++) {
		cardNoId = "pc"+(i+1);
		card = document.getElementById(cardNoId);
		card.innerHTML = ("<img src='./img/"+String(playersHand[i])+".png' width='"+String(cardWidth)+"' height='"+String(cardHeight)+"'/>");
		card.style.left = String(handPos + i*cardShift)+"px";
		card.style.width = String(cardWidth)+"px";
		card.style.height = String(cardHeight) + "px";
		card.style.visibility = "visible";
		card.style.zIndex = String(i);
		var selected=0;
		for(var j=0; j<selectedHand.length; j++) {
			if(playersHand[i] == selectedHand[j]) {
				selected = 1;
			}
		}
		if (selected) {
			card.style.top = String(HandHeight-SelectShift) + "px";
		} else {
			card.style.top = String(HandHeight) + "px";
		}
	}
	for(var i=playersHand.length; i<13; i++) {
		cardNoId = "pc"+(i+1);
		card = document.getElementById(cardNoId);
		card.style.visibility = "hidden";
	}
}

function drawOpponentsHands() {
	if(finishedDealing == 0) return;
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	var o1l = opp1left; var o1t = opp1top;
	var o2l = opp2left; var o2t = opp2top;
	var o3l = opp3left; var o3t = opp3top;
	for(var i=0; i<oppHand1.length; i++) {
		ctx.save();
		ctx.translate(o1l+oppCardWidth/2,o1t+oppCardHeight/2);
		ctx.rotate(Math.PI/2);
		ctx.translate(-o1l-oppCardWidth/2,-o1t-oppCardHeight/2);
		ctx.drawImage(backOfCard,o1l,o1t,oppCardWidth,oppCardHeight);
		ctx.restore();
		o1t += oppCardShift;
	}
	
	for(var i=0; i<oppHand2.length; i++) {
		ctx.drawImage(backOfCard,o2l,o2t,oppCardWidth,oppCardHeight);
		o2l += oppCardShift;
	}
	
	for(var i=0; i<oppHand3.length; i++) {
		ctx.save();
		ctx.translate(o3l+oppCardWidth/2,o3t+oppCardHeight/2);
		ctx.rotate(-Math.PI/2);
		ctx.translate(-o3l-oppCardWidth/2,-o3t-oppCardHeight/2);
		ctx.drawImage(backOfCard,o3l,o3t,oppCardWidth,oppCardHeight);
		ctx.restore();
		o3t += oppCardShift;
	}
		
}

function sortNumber(a,b) {
    return a - b;
}

function sortHand() {
	if (sortInd==1) {
		playersHand.sort(sortNumber);
		sortInd *= -1;
		drawPlayersHand();
	} else if (sortInd == -1) {
		//sort by suits
		var diamonds = [];
		var clubs = [];
		var hearts = [];
		var spades = [];
		for(var i=0; i<playersHand.length; i++) {
			if(playersHand[i] % 4 == 1) { //then club.
				diamonds.push(playersHand[i]);
			} else if(playersHand[i] % 4 == 2) { //then spade.
				clubs.push(playersHand[i]);
			} else if(playersHand[i] % 4 == 3) { //then heart.
				hearts.push(playersHand[i]);
			} else {
				spades.push(playersHand[i]);
			}
		}
		playersHand = diamonds.concat(clubs,hearts,spades);
		sortInd *= -1;
		drawPlayersHand();
	}
}

function selectCard(n) {
	var alreadythere = 0; var index = 0;
	for(var i=0; i<selectedHand.length; i++) {
		if(playersHand[n-1] == selectedHand[i]) {
			alreadythere = 1;
			index = i;
		}
	}
	if (alreadythere) { //remove
		selectedHand.splice(index,1);
	} else {
		selectedHand.push(playersHand[n-1]);
	}
	drawPlayersHand();
}

function setDiff(arr1,arr2) {
	//returns set difference of two arrays.
	var out = [];
	for(var i=0; i<arr1.length; i++) {
		c=0;
		for(var j=0; j<arr2.length; j++) {
			if(arr1[i]==arr2[j]) {
				c++; break;
			}
		}
		if(c==0) out.push(arr1[i]);
	}
	return out;
}

function submitHand() {
	if(gameFinished) {
		alert("Game is over. Start a new game");
		return;
	}
	if(plyrsGo != 1) {
		alert("It's not your turn!");
		selectedHand = [];
		drawPlayersHand();
		return;
	} else if(selectedHand.length==0) {
		alert("You need to select some cards.");
		return;
	} else if(selectedHand.length>5) {
		alert("Too many cards selected.");
		selectedHand = [];
		drawPlayersHand();
		return;
	} else {
		if(control) {//can play anything less (5 cards or less) if it's a real hand.
			if(isRealHand(selectedHand)) {
				passCounter = 0;
				previousHand = selectedHand;
				selectedHand = [];
				playersHand = setDiff(playersHand,previousHand);
				plyrsGo = 2;
				drawPrevHand();
				drawPlayersHand();
				control = 0;
				if(previousHand.length==1 && previousHand[0]==52) {
					plyrsGo =1;
					control = 1;
				}
				updatePlyrsGo();
					
				if(playersHand.length==0) {win(1); finishGame(1);}
				return;
			} else {
				alert("Not a valid hand.");
				selectedHand=[];
				drawPlayersHand;
				return;
			}
		} else { //have to beat previous hand
				if(selectedHand.length != previousHand.length) {
					alert("You need to play the same number of cards as in the previous hand!");
					selectedHand = [];
					drawPlayersHand();
					return;
				} else if(!isRealHand(selectedHand)) {
					alert("Not a real hand.");
					selectedHand=[];
					drawPlayersHand();
					return;
				}else if(!compareHands(selectedHand,previousHand)) {
					alert("Doesn't beat the previous hand.");
					selectedHand = [];
					drawPlayersHand();
					return;
				} else { //hand is valid
					passCounter = 0;
					control = 0;
					previousHand = selectedHand;
					selectedHand = [];
					playersHand = setDiff(playersHand,previousHand);
					plyrsGo = 2;
					drawPrevHand();
					drawPlayersHand();
					if(previousHand.length==1 && previousHand[0]==52) {//2 of diamonds always gets control
						plyrsGo =1;
						control = 1;
					}
					updatePlyrsGo();
					if(playersHand.length==0) {win(1); finishGame(1);}
					return;
				}
				alert("If you're here I've no idea what you did, but fair play");
				selectedHand = [];
				drawPlayersHand();
				return;
		}
				
	}
}

function win(n) {
	but = document.getElementById("newgame");
	but.style.visibility="visible";
	ply = document.getElementById("whosgo");
	if(n==1) {
		ply.textContent = "You win!";
	} else {
		ply.textContent = "You just lost? What a beginner!";
	}
}

function pass() {
	if(gameFinished) {
		alert("Game is over. Start a new game!");
		return;
	}
	if(plyrsGo!=1) {
		alert("Not your turn!");
		return;
	} else {
		plyrsGo = 2;
		passCounter++;
		if(passCounter==3) {
			control = 1;
			passCounter = 0;
		}
		selectedHand = [];
		drawPlayersHand();
		updatePlyrsGo();
		return;
	}
}

function AIgo() {
	if(gameFinished) {
		alert("Game is over. Start a new game!");
		return;
	}

	if(plyrsGo==1) {
		alert("It's your turn!");
	} else if(plyrsGo==2) {
		decision = AIdecision(oppHand1,previousHand,control);
		if(decision==0) {//pass
			passCounter++;
			if(passCounter==3) {
				control = 1;
				passCounter = 0;
			}
			plyrsGo=3;
			updatePlyrsGo();
			return;
		} else {
			previousHand = decision;
			control = 0;
			oppHand1 = setDiff(oppHand1,previousHand);
			passCounter = 0;
			plyrsGo=3;
			if(previousHand.length==1 && previousHand[0]==52) {
					plyrsGo =2;
					control = 1;
			}
			updatePlyrsGo();
			drawPrevHand();
			drawOpponentsHands();
			drawPlayersHand();
			if(oppHand1.length==0) {
				win(2); finishGame(2);
			}
			
			return;
		}
	} else if(plyrsGo==3) {
		decision = AIdecision(oppHand2,previousHand,control);
		if(decision==0) {//pass
			passCounter++;
			if(passCounter==3) {
				control = 1;
				passCounter = 0;
			}
			plyrsGo=4;
			updatePlyrsGo();
			return;
		} else {
			previousHand = decision;
			control = 0;
			oppHand2 = setDiff(oppHand2,previousHand);
			passCounter = 0;
			plyrsGo=4;
			if(previousHand.length==1 && previousHand[0]==52) {
					plyrsGo =3;
					control = 1;
			}
			updatePlyrsGo();
			drawPrevHand();
			drawOpponentsHands();
			drawPlayersHand();
			if(oppHand2.length==0) {
				win(3); finishGame(3);
			}
			return;
		}
	} else if(plyrsGo==4) {
		decision = AIdecision(oppHand3,previousHand,control);
		if(decision==0) {//pass
			passCounter++;
			if(passCounter==3) {
				control = 1;
				passCounter = 0;
			}
			plyrsGo=1;
			updatePlyrsGo();
			return;
		} else {
			previousHand = decision;
			control = 0;
			oppHand3 = setDiff(oppHand3,previousHand);
			passCounter = 0;
			plyrsGo=1;
			if(previousHand.length==1 && previousHand[0]==52) {
					plyrsGo =4;
					control = 1;
				}
			updatePlyrsGo();
			drawPrevHand();
			drawOpponentsHands();
			drawPlayersHand();
			if(oppHand3.length==0) {
				win(4); finishGame(4);
			}
			return;
		}
	}
}

function isRealHand(hand) {
	if(hand.length>5 || hand.length==0) return 0;
	if(hand.length==1) return 1;
	if(hand.length==2 && isPair(hand)) return 1;
	if(hand.length==3 && isThreeOfAKind(hand)) return 1;
	if(hand.length==4 && (isFourOfAKind(hand) || isTwoPair(hand))) return 1;
	if(hand.length==5 && (isStraight(hand) || isFlush(hand) || isFullHouse(hand) || isStraightFlush(hand))) return 1;
	return 0;
}

function isPair(hand) { //takes an array and returns 0 if not a pair, 1 if a pair.
	if(hand.length != 2) return 0;
	if(Math.ceil(hand[0]/4)==Math.ceil(hand[1]/4)) {
		return 1;
	} else {
		return 0;
	}
}

function isThreeOfAKind(hand) {//returns 0 if not 3 of a kind or 1 if it is.
	if(hand.length != 3) return 0;
	if(Math.ceil(hand[0]/4)==Math.ceil(hand[1]/4) && Math.ceil(hand[0]/4) == Math.ceil(hand[2]/4)) {
		return 1;
	} else {
		return 0;
	}
}

function isFourOfAKind(hand) {//returns 0 if not 3 of a kind or 1 if it is.
	if(hand.length != 4) return 0;
	if(Math.ceil(hand[0]/4)==Math.ceil(hand[1]/4) && Math.ceil(hand[0]/4) == Math.ceil(hand[2]/4) && Math.ceil(hand[0]/4)==Math.ceil(hand[3]/4)) {
		return 1;
	} else {
		return 0;
	}
}


function isStraightFlush(hand) {
	if(hand.length != 5) return 0;
	hand.sort(sortNumber);
	if(hand[0]+4==hand[1] && hand[1]+4==hand[2] && hand[2]+4==hand[3] && hand[3]+4 == hand[4]) {
		return 1;
	} else {
		return 0;
	}
}

function isStraight(hand) {
	if(hand.length != 5) return 0;
	hand.sort(sortNumber);
	if(Math.ceil(hand[0]/4)+1==Math.ceil(hand[1]/4) && Math.ceil(hand[1]/4)+1==Math.ceil(hand[2]/4) && Math.ceil(hand[2]/4)+1==Math.ceil(hand[3]/4) && Math.ceil(hand[3]/4)+1==Math.ceil(hand[4]/4) && !isStraightFlush(hand)) {
		return 1;
	} else {
		return 0;
	}
}

function isFlush(hand) {
	if(hand.length != 5) return 0;
	if(hand[0] % 4 == hand[1] % 4 && hand[0] % 4 == hand[2] % 4 && hand[0] % 4 == hand[3] % 4 && hand[0] % 4 == hand[4] % 4) {
		return 1;
	} else {
		return 0;
	}
}

function isFullHouse(hand) { //returns 0 if not full house. 1 if fullhouse with smaller value being the 3 cards, 2 if fullhouse with larger value being the 3 cards.
	if(hand.length != 5) return 0;
	hand.sort(sortNumber);
	if(Math.ceil(hand[0]/4)==Math.ceil(hand[1]/4) && Math.ceil(hand[0]/4)==Math.ceil(hand[2]/4) && Math.ceil(hand[3]/4)==Math.ceil(hand[4]/4)) {
		return 1;
	} else if(Math.ceil(hand[0]/4)==Math.ceil(hand[1]/4) && Math.ceil(hand[2]/4)==Math.ceil(hand[3]/4) && Math.ceil(hand[2]/4) == Math.ceil(hand[4]/4)) {
		return 2;
	}
}

function finishGame(i) {
	//input i is winner.
	gameFinished=1;
	CGScore1=playersHand.length;
	CGScore2=oppHand1.length;
	CGScore3=oppHand2.length;
	CGScore4=oppHand3.length;
	if(i==1) {
		Score1 += CGScore2 + CGScore3 + CGScore4;
		Score2 -= CGScore2;
		Score3 -= CGScore3;
		Score4 -= CGScore4;
	}
	else if(i==2) {
		Score1 -= CGScore1;
		Score2 += CGScore1 + CGScore3 + CGScore4;
		Score3 -= CGScore3;
		Score4 -= CGScore4;
	} else if(i==3) {
		Score1 -= CGScore1;
		Score2 -= CGScore2;
		Score3 += CGScore1 + CGScore2 + CGScore4;
		Score4 -= CGScore4;
	} else if(i==4) {
		Score1 -= CGScore1;
		Score2 -= CGScore2;
		Score3 -= CGScore3;
		Score4 += CGScore1+CGScore2+CGScore3;
	}		
	updateScores();
}

function updateScores() {
	elem1=document.getElementById("player1");
	elem1.innerHTML = (" ");
	elem2=document.getElementById("player2");
	elem2.innerHTML = ("P2");
	elem3 = document.getElementById("player3");
	elem3.innerHTML = ("P3");
	elem4 = document.getElementById("player4");
	elem4.innerHTML = ("P4");
}