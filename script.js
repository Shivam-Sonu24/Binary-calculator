const result = document.getElementById('result');
let current = '';
let operator = '';
let operand = '';
let justCalculated = false;

function updateDisplay(val) {
    result.textContent = val || '0';
}

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
    if (current === '') return;
    if (operand && operator && current) {
        calculate();
        operand = current;
        current = '';
    } else {
        operand = current;
        current = '';
    }
    operator = op;
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