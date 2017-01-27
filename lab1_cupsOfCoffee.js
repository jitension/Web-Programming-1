function cupsOfCoffee(howManyCups) {

    try {
        if (howManyCups == null || howManyCups < 0) {    // I have taken 0 into consideration bcoz of lack of clarity however negative numbers are not allowed 
            throw "Error: Incorrect or blank Data!!"
        }

        if (typeof (howManyCups) != "number") {     // checking for bad input type;
            throw "Error: I was expecting a number!"
        }

    } catch (error) {
        return error;

    }


    var array1 = [];
    while (howManyCups != 0) {


        string1 = howManyCups + "cups of coffee on the desk!" + howManyCups + " cups of coffee!";
        if (howManyCups > 1) {
            string2 = "Pick one up, drink the cup," + (howManyCups - 1) + " cups of coffee on the desk!";
        }
        else {
            string2 = "Pick it up, drink the cup, no more coffee left on the desk!";
        }

        howManyCups--;

        array1.push(string1);
        array1.push(string2);


    }
    return array1;
}

console.log(cupsOfCoffee(2));