function randomizeSentences(paragraph) {

    var tempArray = [], finalArray = [], startIndex = 0, count = 0;
    try {
        if (paragraph == "" || paragraph == null) {     // Checking for blank parameter;
            throw "Error: No DATA!!"
        }

        if (typeof (paragraph) != "string") {       // Checking for bad input type;
            throw "Error: I was expecting a string!!"
        }


        if (paragraph.endsWith("!") == false && paragraph.endsWith(".") == false && paragraph.endsWith("?") == false) { // checking for incomplete sentence;
            throw "Error: sentence incomplete!"         // Assuming that incomplete sentence doesn't make sence for the function(we can discard the incomplete sentence but nothing was mentioned in the question so I kept it as an error to the function);

        }

    } catch (error) {
        return error;

    }


    //  deviding the paragraph into array of sentences;
    for (var i = 0; i < paragraph.length; i++) {
        if (paragraph[i] == "." || paragraph[i] == "!" || paragraph[i] == "?") {
            tempArray.push(paragraph.slice(startIndex, i + 1));
            startIndex = i + 1;
        }

    }

    //  randomizing the array of sentences by using math functions and checking for duplicate data into finalArray to avoid repitation of sentences; 
    while (count < tempArray.length) {
        var item = Math.floor(Math.random() * tempArray.length);

        if (finalArray == "") {
            finalArray.push(tempArray[item]);
            count++;
        }
        else {
            if (finalArray.indexOf(tempArray[item]) == -1) {
                finalArray.push(tempArray[item]);
                count++;
            }


        }
    }
    return finalArray;

}
var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";

//var paragraph;
console.log(randomizeSentences(paragraph));

