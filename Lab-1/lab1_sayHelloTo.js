function sayHelloTo(fName, lName, title) {

    try {
        if (fName == null && lName == null && title == null) {       // checking for no parameter function call;
            throw "Error: No DATA!!"
        }

        if (typeof (fName) != "string" || typeof (lName) != "string" || typeof (title) != "string") {   // checking for bad input type;
            if (typeof (fName) != "undefined" && typeof (lName) != "undefined" && typeof (title) != "undefined") {
                throw "Error: I was expecting a String!!"
            }
        }
    } catch (error) {
        return console.log(error);
    }



    if (fName != null) {
        if (lName != null) {
            if (title != null) {
                console.log("Hello", title, fName, lName + "! Have a good evening!");
            }
            else {
                console.log("Hello", fName, lName + ". I hope you are having a good day!");
            }
        }
        else {
            console.log("Hello ", fName + "!");
        }
    }
}

sayHelloTo();
