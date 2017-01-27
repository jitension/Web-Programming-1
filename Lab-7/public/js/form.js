(function () {
    let textmanMethods = {
		updateText: function (mainText, inputText, freq, wordcount) {
			if (typeof mainText !== "string") throw "Must provide a String";
			if (typeof inputText !== "string") throw "Must provide a String";
			if (typeof freq !== "number") throw "Must provide a number";
			if (isNaN(freq)) throw "Must provide a number";
			if (typeof wordcount !== "number") throw "Must provide a number";
			if (isNaN(wordcount)) throw "Must provide a number";


			var apendCount = 0;
			var strLength = 0;
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
		}

    };

    var staticForm = document.getElementById("static-form");

    if (staticForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.

        var firstTextElement = document.getElementById("String1");
        var secondTextElement = document.getElementById("String2");
        var firstNumberElement = document.getElementById("number1");
        var secondNumberElement = document.getElementById("number2");


        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {
                // hide containers by default
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");
				if (firstTextElement.value == ' ') {
					throw "Main Text cannot be blank";
				}
                var firstTextValue = firstTextElement.value;
                // Values come from inputs as strings, no matter what :(

				if (secondTextElement.value == "") {
					throw "String To Insert cannot be blank";
				}
				var secondTextValue = secondTextElement.value;

                var firstNumberValue = firstNumberElement.value;
                var secondNumberValue = secondNumberElement.value;


				var parsedFirstNumberValue = parseInt(firstNumberValue);
				if (parsedFirstNumberValue < 1 || parsedFirstNumberValue > 25) {
					throw "Insert Frequency should be a value from 1 to 25";
				}
                var parsedSecondNumberValue = parseInt(secondNumberValue);
				if (parsedSecondNumberValue < 1 || parsedSecondNumberValue > 25) {
					throw "Number Of Characters should be a value from 1 to 25";
				}

                var result = textmanMethods.updateText(firstTextValue, secondTextValue, parsedFirstNumberValue, parsedSecondNumberValue);
                resultTextElement.textContent = "The result is: " + result;
                resultContainer.classList.remove("hidden");
            } catch (e) {
                var message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();