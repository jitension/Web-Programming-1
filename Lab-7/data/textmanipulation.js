
let exportedMethods = {
	updateText(mainText, inputText, freq, wordcount) {
		if (typeof mainText !== "string") throw "Must provide a String";
		if (mainText == ' ') throw "Main Text cannot be blank";
		if (typeof inputText !== "string") throw "Must provide a String";
		if (inputText === "") throw "String To Insert cannot be blank";
		if (typeof freq !== "number") throw "Must provide a number";
        if (isNaN(freq)) throw "Must provide a number";
		if (freq < 1 || freq > 25) throw "Insert Frequency should be a value from 1 to 25";
		if (typeof wordcount !== "number") throw "Must provide a number";
        if (isNaN(wordcount)) throw "Must provide a number";
		if (wordcount < 1 || wordcount > 25) throw "Number Of Characters should be a value from 1 to 25";

		var apendCount = 0, strLength = 0;
		var tempFlag = false;

		for (i = 0; i <= freq; i++) {

			var tempPos = 0;
			var tempPos1 = 0;

			if (apendCount < freq) {

				tempFlag = true;
				if (apendCount == 0) {
					strLength = wordcount;
				} else {
					strLength = strLength + wordcount;
					tempPos1 = wordcount + inputText.length + 2;
					tempPos = wordcount * apendCount + inputText.length + 2 * apendCount;
				}
			} else {
				break;
			}
			apendCount++

			if (tempFlag) {
				var tempStr1 = mainText.substr(0, strLength).concat(inputText);
				var tempStr2 = mainText.slice(strLength);
				strLength = tempStr1.length;
				mainText = tempStr1.concat(tempStr2);
			}
		}
        return mainText;
	},
}

module.exports = exportedMethods;