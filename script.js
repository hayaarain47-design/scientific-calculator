let expression = "";
let isDegree = true;

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const historyDisplay = document.getElementById("history");

function updateDisplay() {
    expressionDisplay.textContent = expression;
}

function insertValue(value) {
    expression += value;
    updateDisplay();
}

function clearCalculator() {
    expression = "";
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "0";
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (expression === "") return;

    try {
        let exp = expression
            .replace(/π/g, "Math.PI")
            .replace(/×/g, "*")
            .replace(/÷/g, "/");

        let answer = eval(exp);

        if (!Number.isFinite(answer)) {
            throw new Error();
        }

        answer = Number(answer.toFixed(10));

        resultDisplay.textContent = answer;
        addHistory(expression, answer);

        expression = String(answer);

    } catch {
        resultDisplay.textContent = "Error";
    }
}

function calculateFunction(type) {

    if (type === "power") {
        expression += "**";
        updateDisplay();
        return;
    }

    if (expression === "") return;

    try {

        let value = eval(
            expression
                .replace(/π/g, "Math.PI")
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
        );

        let answer;

        switch (type) {

            case "sin":
                answer = Math.sin(toRadians(value));
                break;

            case "cos":
                answer = Math.cos(toRadians(value));
                break;

            case "tan":
                answer = Math.tan(toRadians(value));
                break;

            case "log":
                answer = Math.log10(value);
                break;

            case "ln":
                answer = Math.log(value);
                break;

            case "sqrt":
                answer = Math.sqrt(value);
                break;

            case "square":
                answer = value * value;
                break;

            case "factorial":
                answer = factorial(value);
                break;

            case "percent":
                answer = value / 100;
                break;

            case "reciprocal":
                answer = 1 / value;
                break;

            default:
                return;
        }

        if (!Number.isFinite(answer)) {
            throw new Error();
        }

        answer = Number(answer.toFixed(10));

        expressionDisplay.textContent = `${type}(${value})`;
        resultDisplay.textContent = answer;

        addHistory(`${type}(${value})`, answer);

        expression = String(answer);

    } catch {
        resultDisplay.textContent = "Error";
    }
}

function factorial(number) {

    if (number < 0 || !Number.isInteger(number)) {
        throw new Error();
    }

    let result = 1;

    for (let i = 2; i <= number; i++) {
        result *= i;
    }

    return result;
}

function toRadians(value) {

    if (isDegree) {
        return value * Math.PI / 180;
    }

    return value;
}

function addHistory(exp, answer) {

    const empty = document.querySelector(".empty-history");

    if (empty) {
        empty.remove();
    }

    const item = document.createElement("div");

    item.className = "history-item";

    item.innerHTML = `
        <div class="history-expression">${exp}</div>
        <div class="history-result">= ${answer}</div>
    `;

    historyDisplay.prepend(item);
}

function clearHistory() {

    historyDisplay.innerHTML =
        '<p class="empty-history">No calculations yet</p>';
}


/* DEG / RAD */

document.getElementById("degreeBtn").onclick = function () {

    isDegree = true;

    this.classList.add("active");

    document
        .getElementById("radianBtn")
        .classList.remove("active");
};

document.getElementById("radianBtn").onclick = function () {

    isDegree = false;

    this.classList.add("active");

    document
        .getElementById("degreeBtn")
        .classList.remove("active");
};


/* Keyboard */

document.addEventListener("keydown", function (event) {

    let key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "(" ||
        key === ")"
    ) {
        insertValue(key);
    }

    if (key === "Enter" || key === "=") {
        calculate();
    }

    if (key === "Backspace") {
        deleteLast();
    }

    if (key === "Escape") {
        clearCalculator();
    }
});
