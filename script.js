const result = document.getElementById('result');
let current = '';
let operator = '';
let operand = '';
let justCalculated = false;

document.getElementById("btnDel").onclick = () => {
    current = current.slice(0, -1); // remove last character
    updateDisplay(current || "");   // show empty if all deleted
};


function updateDisplay(val) {
    result.textContent = val || '0';
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Allow only binary digits 0,1
    if (key === '0' || key === '1') {
        current += key;
        updateDisplay(current);
    }

    // Allow operators +, -, *, /
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperator(key);
    }

    // Enter or = key to calculate result
    else if (key === 'Enter' || key === '=') {
        calculate();
    }

    // Backspace to remove last digit
    else if (key === 'Backspace') {
        current = current.slice(0, -1);
        updateDisplay(current || "");
    }

    // Escape or C key to clear all
    else if (key.toLowerCase() === 'c' || key === 'Escape') {
        clearAll();
    }
});


function appendNum(num) {
    if (justCalculated) {
        current = '';
        justCalculated = false;
    }
    if (current.length < 16) { // Limit input length
        current += num;
        updateDisplay(current);
    }
}

function setOperator(op) {
    if (current === "") return;

    if (op === '×') op = '*';
    if (op === '÷') op = '/';

    if (operand !== "") {
        calculate();
    }

    operator = op;
    operand = current;
    current = "";
}


function calculate() {
    if (!operator || current === '' || operand === '') return;
    let a = parseInt(operand, 2);
    let b = parseInt(current, 2);
    let res;
    switch (operator) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '×': res = a * b; break;
        case '÷':
            if (b === 0) {
                updateDisplay('Error');
                current = '';
                operator = '';
                operand = '';
                return;
            }
            res = Math.floor(a / b);
            break;
        default: return;
    }
    updateDisplay(res.toString(2));
    current = res.toString(2);
    operator = '';
    operand = '';
    justCalculated = true;
}

function clearAll() {
    current = '';
    operator = '';
    operand = '';
    justCalculated = false;
    updateDisplay('');
}

document.getElementById('btn1').onclick = () => appendNum('1');
document.getElementById('btn0').onclick = () => appendNum('0');
document.getElementById('btnAdd').onclick = () => setOperator('+');
document.getElementById('btnSub').onclick = () => setOperator('-');
document.getElementById('btnMul').onclick = () => setOperator('×');
document.getElementById('btnDiv').onclick = () => setOperator('÷');
document.getElementById('btnEq').onclick = () => calculate();
document.getElementById('btnClr').onclick = () => clearAll();

updateDisplay('');
