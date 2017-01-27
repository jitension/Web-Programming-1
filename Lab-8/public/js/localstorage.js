// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function ($, localStorage) {

    var localStorageTableBody = $("#localstorage-data tbody");
    var clearStorage = $("#clear-storage");

    var keyNameInput = "Last Inputed Value";
    var keyValueInput = $("#localstorage-value");
    var kvpForm = $("#localstorage-form");
    var formAlert = $("#form-alert");
    var counterValue = 0;
    var counterName = "Counter";
    var hashValue = "Hash";

    function resetTable() {
        localStorageTableBody.empty();

        // We use the localStorage.key(number) property to get the key name at index number
        for (var i = 0; i < localStorage.length; i++) {
            var currentKey = localStorage.key(i);
            var curentValue = localStorage[currentKey];

            var newHtmlString = "<tr><td>" + currentKey + "</td><td>" + curentValue + "</td><td>" //+ typeAfterParsing + "</td></tr>"
            localStorageTableBody.append(newHtmlString);
        }
    }

    clearStorage.click(function () {
        localStorage.clear();
        resetTable();
    });

    window.onload = function (e) {

        var currentIterations = 0;
        var intervalResult = "Interval";

        var intervalId = window.setInterval(function () {
            var iteration = ++currentIterations;
            //    var message = iteration === 1 ? iteration + " interval has now occurred" : iteration + " intervals have occurred";

            // intervalResult.text(message);
            localStorage[intervalResult] = iteration;
            resetTable();

        }, 1500);

        $(window).on('hashchange', function () {
            localStorage[hashValue] = location.hash.replace("#", "");
            resetTable();
        });

    }



    kvpForm.submit(function (event) {
        event.preventDefault();


        // reset the form
        formAlert.addClass('hidden');
        formAlert.text('');

        var keyStr = keyNameInput;
        var valStr = keyValueInput.val();
        // check if it's in the format of an object
        var jsonString = valStr;

        try {
            // this will throw when given a non JSON string
            JSON.parse(valStr);
            // if this succeeded, the user passed us something we could parse, and we don't have to encode it further
        } catch (e) {
            // this did not succeed, which means that the user passed us some sort of string
            jsonString = JSON.stringify(valStr);
        }

        localStorage[keyStr] = jsonString;

        //   keyNameInput = "";
        keyValueInput.val('');

        counterValue++;

        localStorage[counterName] = counterValue;

        location.hash = "#some-time";

    });

    // Now we setup our table
    resetTable();

})(jQuery, window.localStorage);
// jQuery is exported as $ and jQuery
// the location API is accessed via the window.location variable
