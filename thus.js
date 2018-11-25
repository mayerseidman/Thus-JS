// Function that spits back JUST text (not html elements) that can be parsed d
function textNodesUnder(el){
	var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
 	while(n=walk.nextNode()) a.push(n);
 	return a;
}

var nodes = textNodesUnder(document)

// Click Handling
var dialectOne = document.getElementById("dialectOne");
dialectOne.onclick = function() { 
	var wordPairs = [["this", "thus"], ["you", "thou"], ["it is", "'tis"], ["it was", "'twas"], ["do", "dost"]];
	replaceWords(wordPairs);
};

var dialectTwo = document.getElementById("dialectTwo");
dialectTwo.onclick = function() { 
	var wordPairs = [["when", "enwhay"], ["from", "omfray"], ["this", "isthay"]];
	replaceWords(wordPairs);
};


// Word Pairs we replace and substitute

// var wordPairs = [["this", "thus"], ["you", "thou"], ["it is", "'tis"], ["it was", "'twas"], ["do", "dost"]]

var lastWordPairs = [];

function replaceWords(newWordPairs) {
	var wordPairs = newWordPairs.map(function(newPair) {
		for (var i = 0; i < lastWordPairs.length; i++) {
			if (lastWordPairs[i][0] == newPair[0]) {
				return [lastWordPairs[i][1], newPair[1]];
			}
		}
		return newPair
	})

	lastWordPairs.map(function(lastPair) {
		for (var i = 0; i < newWordPairs.length; i++) {
			if (newWordPairs[i][0] == lastPair[0]) {
				return
			}
		}
		var reversePair = lastPair.slice().reverse();
		wordPairs.push(reversePair)
	})
	console.log(wordPairs)
	var casedWords = []

	for (var j = 0; j < wordPairs.length; j++) {
		var oldWord = wordPairs[j][0].charAt(0).toUpperCase() + wordPairs[j][0].slice(1)
		var newWord = wordPairs[j][1].charAt(0).toUpperCase() + wordPairs[j][1].slice(1)
		casedWords.push([oldWord, newWord])
	}

	var finalWords = wordPairs.concat(casedWords)

	for (var i = 0; i < nodes.length; i++) {
		var text = nodes[i].textContent;
		for (var j = 0; j < finalWords.length; j++) {
			var oldWord = finalWords[j][0]
			var newWord = finalWords[j][1]

			var pattern = ' ' + oldWord + '(?!\\w)'
			var regx = new RegExp(pattern, "g")

			text = text.replace(regx, ' ' + newWord);
		}
		nodes[i].textContent = text;
	}
	lastWordPairs = newWordPairs;
}