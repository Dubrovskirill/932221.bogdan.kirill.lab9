let oldPart, newPart;
let operatorInserted = false;
let result_eq = false;

document.addEventListener('DOMContentLoaded', () => {
    oldPart = document.getElementById('old-part');
    newPart = document.getElementById('new-part');
});

function clearDisplay() {
    oldPart.textContent = '';
    newPart.textContent = '\u00A0' + '0';
    operatorInserted = false;
    result_eq = false;
}

function deleteDigit() {
    if (newPart.textContent === 'Error') {
        oldPart.textContent = '';
        newPart.textContent = '\u00A0' + '0';
        operatorInserted = false;
        result_eq = false;
        return;
    }

    if (result_eq) {

        newPart.textContent = '\u00A0' + '0';
        oldPart.textContent = '';
        result_eq = false;
        operatorInserted = false;
        return;
    }

    if (newPart.textContent.length > 1) {
        newPart.textContent = newPart.textContent.slice(0, -1);
    } else {
        newPart.textContent = '\u00A0' + '0';
    }
}

function appendNumber(number) {
    if (newPart.textContent === 'Error') {
        oldPart.textContent = '';
        newPart.textContent = '\u00A0' + number;
        operatorInserted = false;
        result_eq = false;
        return;
    }

    if (result_eq) {

        newPart.textContent = '\u00A0' + number;
        oldPart.textContent = '';
        result_eq = false;
        operatorInserted = false;
    } else if (newPart.textContent === '0' || newPart.textContent === '\u00A0' + '0' || newPart.textContent === '') {
        newPart.textContent = '\u00A0' + number;
    } else {
        newPart.textContent += number;
    }


    if (oldPart.textContent.trim() === '') {
        operatorInserted = false;
    }

}

function appendDot() {
    if (newPart.textContent === 'Error') {
        oldPart.textContent = '';
        newPart.textContent = '\u00A0' + '0.';
        operatorInserted = false;
        result_eq = false;
        return;
    }

    if (result_eq) {
        newPart.textContent = '\u00A0' + '0.';
        oldPart.textContent = '';
        result_eq = false;
        operatorInserted = false;
    } else if (!newPart.textContent.includes('.')) {
        if (newPart.textContent === '' || newPart.textContent === '0' || newPart.textContent === '\u00A0' + '0') {
            newPart.textContent = '\u00A0' + '0.';
        } else {
            newPart.textContent += '.';
        }
    }


    if (oldPart.textContent.trim() === '') {
        operatorInserted = false;
    }
}

function appendOperator(op) {
    if (newPart.textContent === 'Error') return;

    if (result_eq) {
        oldPart.textContent = newPart.textContent + '\u00A0' + op;
        newPart.textContent = '\u00A0' + '0';
        operatorInserted = true;
        result_eq = false;
        return;
    }

    const operators = ['+', '−', '×', '÷', '-', '*', '/']; 
    let hasOperator = false;
    if (oldPart.textContent.trim() !== '') {
        const lastChar = oldPart.textContent.trim().slice(-1);

        if (['+', '-', '*', '/'].includes(lastChar)) {
            hasOperator = true;
        }
    }

    if (!hasOperator) {

        oldPart.textContent = newPart.textContent + '\u00A0' + op;
        newPart.textContent = '\u00A0' + '0';
        operatorInserted = true;
    } else {

        oldPart.textContent = oldPart.textContent.slice(0, -1) + op;

        operatorInserted = true;
    }
}

function calculateResult() {
    if (!oldPart.textContent || newPart.textContent === 'Error') return;

    let expression = oldPart.textContent.replace(/\u00A0/g, '') + newPart.textContent.replace(/\u00A0/g, '');
    let result = evaluateExpression(expression);

    if (result === 'Error' || !isFinite(result)) {
        oldPart.textContent = '';
        newPart.textContent = 'Error';
    } else {
        const formatted = parseFloat(result).toString();
        oldPart.textContent = '';
        newPart.textContent = formatted;
    }

    operatorInserted = false;
    result_eq = true;
}

function evaluateExpression(expr) {
    expr = expr.replace(/\s+/g, '');
    if (!/^[0-9+\-*/.()]+$/.test(expr)) return 'Error';
    try {
        const result = new Function('return ' + expr)();
        if (!isFinite(result)) return 'Error';
        return result;
    } catch (e) {
        return 'Error';
    }
}


window.clearDisplay = clearDisplay;
window.appendNumber = appendNumber;
window.appendDot = appendDot;
window.appendOperator = appendOperator;
window.calculateResult = calculateResult;
window.deleteDigit = deleteDigit;