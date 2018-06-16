//AI function.  Very basic AI. Takes current AI hand, previous hand and whether or not it has
//control and randomly chooses an allowable move.

function AIdecision(currentHand, prevHand, control) {
	currentHand.sort(sortNumber);
	currentHand.sort(sortNumber);
	//first identify what (more than single card) hands we possess. Not especially efficient but should be quick enough.
	var twoCardHands = []; var threeCardHands = []; var fourCardHands = []; var fiveCardHands = [];
	for(var i=0; i<(currentHand.length-1); i++) {
		if(Math.ceil(currentHand[i]/4)==Math.ceil(currentHand[i+1]/4)) {
			twoCardHands.push([currentHand[i],currentHand[i+1]]);
		}
	}
	
	//three card hands.
	for(var i=0; i<(currentHand.length-2); i++) {
		if(Math.ceil(currentHand[i]/4)==Math.ceil(currentHand[i+1]/4)&&Math.ceil(currentHand[i]/4)==Math.ceil(currentHand[i+2]/4)) {
			threeCardHands.push([currentHand[i],currentHand[i+1],currentHand[i+2]]);
		}
	}
	
	//five card hands.
	//can form full houses from combinations of two card and three card hands.
	for(var i=0; i<twoCardHands.length; i++) {
		for(var j=0; j<threeCardHands.length; j++) {
			var temp = twoCardHands[i].concat(threeCardHands[j]);
			//need to check all elements are unique.
			var count = 0;
			for(var k=0; k<(temp.length-1); k++) {
				for(var y=(k+1); y<temp.length; y++) {
					if(temp[k]==temp[y]) count++;
				}
			}
			if(count==0) fiveCardHands.push(temp);
		}
	}
	//now look for flushes.
	var diamonds = [];
	var clubs = [];
	var hearts = [];
	var spades = [];
	for(var i=0; i<currentHand.length; i++) {
			if(currentHand[i] % 4 == 1) { //then diamond.
				diamonds.push(currentHand[i]);
			} else if(currentHand[i] % 4 == 2) { //then club.
				clubs.push(currentHand[i]);
			} else if(currentHand[i] % 4 == 3) { //then heart.
				hearts.push(currentHand[i]);
			} else {
				spades.push(currentHand[i]);
			}
	}
	if(diamonds.length>=5) {
		fiveCardHands.push(diamonds.slice(0,4).concat(diamonds[diamonds.length-1])); //only add one flush to play. Lowest 4 cards and highest.
	}
	if(clubs.length>=5) {
		fiveCardHands.push(clubs.slice(0,4).concat(clubs[clubs.length-1]));
	}
	if(hearts.length>=5) {
		fiveCardHands.push(hearts.slice(0,4).concat(hearts[hearts.length-1]));
	}
	if(spades.length>=5) {
		fiveCardHands.push(spades.slice(0,4).concat(spades[spades.length-1]));
	}
	
	//now looking for straights.
	for(var i=0; i<(currentHand.length-4); i++) {
		var temp = []; temp.push(currentHand[i]);
		var sn = Math.ceil(currentHand[i]/4); var count = 1;
		for(var j=(i+1); j<currentHand.length; j++) {
			if(Math.ceil(currentHand[j]/4)==(sn+1)) {
				count++; sn++; temp.push(currentHand[j]);
			}
		}
		if(count>=5) {
			fiveCardHands.push(temp.slice(temp.length-5,temp.length));
		}
	}//may lead to double inclusions but doesn't really matter.
	
	//if the AI has control, it plays a hand of the highest number of cards it can
		
	if(control) {
		var n, rn;
		n = fiveCardHands.length;
		if(n>0) {
			rn = Math.floor(n*Math.random());
			return fiveCardHands[rn];
		} else {
			n = fourCardHands.length;
			if(n>0) {
				rn = Math.floor(n*Math.random());
				return fourCardHands[rn];
			} else {
				n = threeCardHands.length;
				if(n>0) {
					rn = Math.floor(n*Math.random());
					return threeCardHands[rn];
				} else {
					n = twoCardHands.length;
					if(n>0) {
						rn = Math.floor(n*Math.random());
						return twoCardHands[rn];
					} else {
						n = currentHand.length;
						rn = Math.floor(n*Math.random());
						return [currentHand[rn]];
					}
				}
			}
		}
	} else {
		//not in control.
		//try and play the lowest hand you can.
		if(prevHand.length==1) {
			if(currentHand[currentHand.length-1] < prevHand[0]) return 0; //i.e. pass
			for(var i=0; i<currentHand.length; i++) {
				if(currentHand[i] > prevHand[0]) {
					return [currentHand[i]];
				}
			}
		} else if(prevHand.length==2) {
			for(var i=0; i<twoCardHands.length; i++) {
				if(compareHands(twoCardHands[i],prevHand)) return twoCardHands[i];
			} 
			return 0;
		} else if(prevHand.length==3) {
			for(var i=0; i<threeCardHands.length;i++) {
				if(compareHands(threeCardHands[i],prevHand)) return threeCardHands[i];
			}
			return 0;
		} else if(prevHand.length==4) {
			for(var i=0; i<fourCardHands.length;i++) {
				if(compareHands(fourCardHands[i],prevHand)) return fourCardHands[i];
			}
			return 0;
		} else {
			for(var i=0; i<fiveCardHands.length; i++) {
				if(compareHands(fiveCardHands[i],prevHand)) return fiveCardHands[i];
			}
			return 0;
		}
	}
	
}


function compareHands(hand1, hand2) { //returns 1 if hand1 beats hand2, 0 if hand2 beats hand1.
	//assume hands are valid.
	hand1.sort(sortNumber); hand2.sort(sortNumber);
	if(hand1.length==1) {
		if(hand1[0]>hand2[0]) {
			return 1;
		} else {
			return 0;
		}
	} else if(hand1.length==2) {
		if(hand1[1] > hand2[1]) {
			return 1;
		} else {
			return 0;
		}
	} else if(hand1.length==3) {
		if(hand1[1] > hand2[1]) {
			return 1;
		} else {
			return 0;
		}
	} else if(hand1.length==4) {
		if(isFourOfAKind(hand1)&&!isFourOfAKind(hand2)) {
			return 1;
		} else if(!isFourOfAKind(hand1)&&isFourOfAKind(hand2)) {
			return 0;
		} else if(isFourOfAKind(hand1)&&isFourOfAKind(hand2)) {
			if(hand1[1] > hand2[1]) {
				return 1;
			} else {
				return 0;
			}
		} else { //both two pair. Hand with highest pair wins.
			if(hand1[3] > hand2[3]) {
				return 1;
			} else {
				return 0;
			}
		}
	} else { //is a 5 card hand.
		if(isStraight(hand1) && (isFlush(hand2) || isFullHouse(hand2) || isStraightFlush(hand2))) {
			return 0;
		} else if((isFlush(hand1) || isFullHouse(hand1) || isStraightFlush(hand1))&&isStraight(hand2)) {
			return 1;
		} else if(isFlush(hand1) && (isFullHouse(hand2) || isStraightFlush(hand2))) {
			return 0;
		} else if((isFullHouse(hand2) || isStraightFlush(hand2)) && isFlush(hand2)) {
			return 1;
		} else if(isFullHouse(hand1) && isStraightFlush(hand2)) {
			return 0;
		} else if(isStraightFlush(hand1) && isFullHouse(hand2)) {
			return 1;
		} else if(isStraight(hand1) && isStraight(hand2)) {
			if(hand1[4] > hand2[4]) {
				return 1;
			} else {
				return 0;
			}
		} else if(isFlush(hand1)&&isFlush(hand2)) {
			if(hand1[4] > hand2[4]) {
				return 1;
			} else {
				return 0;
			}
		} else if(isFullHouse(hand1) && isFullHouse(hand2)) {
			var max1, max2;
			if(isFullHouse(hand1)==1) {
				max1 = hand1[0];
			} else {
				max1 = hand1[4];
			}
			if(isFullHouse(hand2)==1) {
				max2 = hand2[0];
			} else {
				max2 = hand2[4];
			}
			if(max1 > max2) {
				return 1;
			} else {
				return 0;
			}
		}
	}
			
}