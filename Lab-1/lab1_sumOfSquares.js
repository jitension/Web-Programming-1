function sumOfSquares(num1, num2, num3) {

    try {
        if (num1 == null || num2 == null || num3 == null) {         // assuming that we must have all three numbers as per the question;
            throw "Error: One or more number(s) is/are missing!!" 
        }

        if (typeof (num1) != "number" || typeof (num2) != "number" || typeof (num3) != "number") {
            throw "Error: I was expecting a number!!"
        }
    } catch (error) {
        return error;
    }

    return (Math.pow(num1, 2) + Math.pow(num2, 2) + Math.pow(num3, 2));
}
console.log(sumOfSquares(1,2,3));
