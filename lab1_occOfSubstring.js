function countOccurrencesOfSubstring(inputString, subString) {

    try {
        if (inputString == "" || inputString == null || subString == null || subString == "") { // throws an error if any of the parameters are blank;
            throw "Error: No DATA in one or more parameter(s)!!"        // Assuming that we need to have both the parameters for this function to work;
        }

        if (typeof (inputString) != "string" || typeof (subString) != "string") {   // checking for bad input type;
            throw "Error: I was expecting a String!!"
        }



    } catch (error) {
        return error;

    }

    var count = 0, windowSize = inputString.length;


    for (var startIndex = 0; startIndex < windowSize; startIndex++) {

        if (inputString.includes(subString) == true) {

            startIndex = inputString.indexOf(subString);
            inputString = inputString.slice(startIndex + 1, windowSize);
            count++;
        }
    }
    return count;

}
var x = countOccurrencesOfSubstring(5,"");
console.log(x);