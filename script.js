```javascript
let expression = "";
let isDegree = true;

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const historyDisplay = document.getElementById("history");

function updateDisplay() {
    expressionDisplay.textContent = expression || "";
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
    if (!expression) return;

    try {
        let formattedExpression = expression
            .replace(/π/g, "Math.PI")
            .replace(/×/g, "*")
            .replace(/÷/g, "/");

        let answer = Function(
            '"use strict"; return (' + formattedExpression + ')'
        )();

        if (!Number.isFinite(answer)) {
            throw new Error("Invalid calculation");
        }

        answer = Number(answer.toFixed(10));

        resultDisplay.textContent = answer;
        addHistory(expression, answer);

    } catch (error) {
        resultDisplay.textContent = "Error";
    }
}

function calculateFunction(type) {
    let value;

    if (type === "power") {
        expression += "**";
        updateDisplay();
        return;
    }

    if (!expression) return;

    try {
        value = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(value)) {
            throw new Error("Invalid number");
        }

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
                answer = value ** 2;
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
            throw new Error("Invalid result");
        }

        answer = Number(answer.toFixed(10));

        expressionDisplay.textContent = `${type}(${value})`;
        resultDisplay.textContent = answer;

        addHistory(`${type}(${value})`, answer);

        expression = String(answer);

    } catch (error) {
        resultDisplay.textContent = "Error";
    }
}

function factorial(number) {
    if (number < 0 || !Number.isInteger(number)) {
        throw new Error("Invalid factorial");
    }

    if (number > 170) {
        throw new Error("Number too large");
    }

    let result = 1;

    for (let i = 2; i <= number; i++) {
        result *= i;
    }

    return result;
}

function toRadians(degrees) {
    if (isDegree) {
        return degrees * Math.PI / 180;
    }

    return degrees;
}

function addHistory(exp, answer) {

    const emptyMessage =
        document.querySelector(".empty-history");

    if (emptyMessage) {
        emptyMessage.remove();
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

document.getElementById("degreeBtn").addEventListener("click", function () {

    isDegree = true;

    this.classList.add("active");
    document.getElementById("radianBtn").classList.remove("active");
});

document.getElementById("radianBtn").addEventListener("click", function () {

    isDegree = false;

    this.classList.add("active");
    document.getElementById("degreeBtn").classList.remove("active");
});

/* Keyboard Support */

document.addEventListener("keydown", function (event) {

    const key = event.key;

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
```
