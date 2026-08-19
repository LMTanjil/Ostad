// ─── DOM Elements ───
const input = document.getElementById('input');
const result = document.getElementById('result');

// Button collections (selected by their shared structural classes)
const numButtons = document.querySelectorAll('.btn-num');
const opButtons = document.querySelectorAll('.btn-op');
const utilButtons = document.querySelectorAll('.btn-util');

// Unique individual action buttons
const acButton = document.querySelector('.btn-ac');
const equalButton = document.querySelector('.btn-eq');
const backspaceButton = document.querySelector('.btn-back');

// Running expression track state
let expression = "";

// ─── Helper: Secure Evaluation Engine ───
function evaluateExpression(expr) {
    if (!expr) return "";
    try {
        // Swap display symbols (÷, ×, −) for real JavaScript mathematical symbols (*, /, -)
        let formattedExpr = expr
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-'); // Handles the specific typography dash

        // If the expression ends with an incomplete trailing operator, strip it before evaluating
        if (['+', '-', '*', '/'].includes(formattedExpr.slice(-1))) {
            formattedExpr = formattedExpr.slice(0, -1);
        }

        if (!formattedExpr) return "";

        // Evaluate calculation values cleanly without raw eval()
        const calcResult = new Function(`return ${formattedExpr}`)();

        // Format decimal float limits so calculations don't overflow layout limits
        return Number.isInteger(calcResult) ? calcResult : parseFloat(calcResult.toFixed(8));
    } catch (error) {
        return ""; // Silently trap half-written expressions while typing
    }
}

// ─── Event Listeners ───

// 1. Number Inputs & Decimals
numButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const val = e.currentTarget.innerText;

        // Prevent typing multiple consecutive decimal points inside a single trailing block
        if (val === '.') {
            const parts = expression.split(/[\+\−\×\÷]/);
            const currentNum = parts[parts.length - 1];
            if (currentNum.includes('.')) return;
        }

        expression += val;
        input.innerText = expression;
        result.innerText = evaluateExpression(expression);
    });
});

// 2. Operators (÷, ×, −, +)
opButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const val = e.currentTarget.innerText;

        if (expression !== "") {
            const lastChar = expression.slice(-1);
            // If user changes their mind, replace the old operator with the newly clicked one
            if (['+', '−', '×', '÷'].includes(lastChar)) {
                expression = expression.slice(0, -1);
            }
            expression += val;
            input.innerText = expression;
        }
    });
});

// 3. Clear Screen (AC Button)
acButton.addEventListener('click', () => {
    expression = "";
    input.innerText = "";
    result.innerText = "";
});

// 4. Backspace Single Character Removal
backspaceButton.addEventListener('click', () => {
    expression = expression.slice(0, -1);
    input.innerText = expression;
    result.innerText = evaluateExpression(expression);
});

// 5. Execution (= Button)
equalButton.addEventListener('click', () => {
    const finalResult = evaluateExpression(expression);
    if (finalResult !== "") {
        expression = finalResult.toString();
        input.innerText = expression;
        result.innerText = ""; // Promotes result string up to the main input line
    }
});

// 6. Utility Functions (+/− Sign Swapping and % Percentages)
utilButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const type = e.currentTarget.innerText;
        const currentResult = evaluateExpression(expression);

        if (currentResult === "") return;

        if (type === '%') {
            expression = (currentResult / 100).toString();
        } else if (type === '+/−') {
            expression = (currentResult * -1).toString();
        }

        input.innerText = expression;
        result.innerText = "";
    });
});