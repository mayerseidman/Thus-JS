function textNodesUnder(el){
	var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
 	while(n=walk.nextNode()) a.push(n);
 	return a;
}

var nodes = textNodesUnder(document)
var wordPairs = [["this", "thus"], ["you", "thou"], ["it is", "'tis"], ["it was", "'twas"], ["do", "dost"]]
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
	nodes[i].textContent = text
}