// functions to print and get the values of the input and history respectively


function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if (num == "") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormatedNumber(num);
    }
}

// the values are formated with the function tolocale for the sepparating commas

function getFormatedNumber(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

// the format is reversed to get the commas out of the value in order to evaluate the expressions
//in case the value is an empty string, the value returned by the function would be 0 and we dont want that so the exception is added to the logics

function reverseFormat(num) {
    if (num == "") {
        return num;
    }
    return Number(num.replace(/,/g, ''));
}


// event listeners are added to every button with a loop, concatenating the value of its own id to the output when clicked
var digit = document.getElementsByClassName("digit");
for (var i = 0; i < digit.length; i++) {
    digit[i].addEventListener("click", function () {
        var output = reverseFormat(getOutput());
        if (output !== NaN) {
            output = output + this.id
            printOutput(output);
        }
    });
}

//every operator is assigned a click event listener
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function () {
        // first the exceptions to the "different behaving" operators that dont concatenate to the expression
        // clear sets both values, history and output to empty string
        if (this.id == "clear") {
            printHistory("")
            printOutput("")
            //backspace take the last value of the output 
        } else if (this.id == "backspace") {
            // the output is turned into a string because that what the .substr() function receives
            var output = reverseFormat(getOutput()).toString();
            //its also verified that the output has any value whatsoever to avoid that when substracting empty string would give NaN
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
            //finally the operators that follow are concatenated to the operations: +, -, *, /, %
        } else {
            var output = getOutput();
            var history = getHistory();
            //here its verified if the last value on the history is an operator or not in order to being able to change it for another one
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    //in case of not being a value it is substracted from the history string
                    history = history.substr(0, history.length - 1)
                }
            }
            //if history or output have a value is evaluated in order to define that the first value in both of them cant be an operator
            if (output != "" || history != "") {
                //particularly if the condition above is false on the side of the output, that leaves its value as empty string
                //otherwise it reverses the format in order to evaluate it
                output = "" ?
                    output : reverseFormat(output);
                history = history + output;
                //equal to operator evaluates the  expression, prints it onto the output and the history is se to empty string
                if (this.id == "=") {
                    var result = eval(history)
                    printOutput(result)
                    printHistory("")
                } else {
                    //the operators are concatenated to the history and the output is set to cero each time an operator is clicked
                    history = history + this.id
                    output = ""
                    printHistory(history)
                    printOutput(output)
                }
            }
        }

    });
}

var arr = [1, 5, 4, 6, 7];
var ordered = arr.sort();
var inverted = [];


for (let i = ordered.length - 1; i >= 0; i--) {
    inverted.push(ordered[i]);
}



console.log(inverted);


