// Get all the elements we need
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');

// Variables to store calculator state
let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
let shouldResetScreen = false;

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Add numbers to the display
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.value === '0' || shouldResetScreen) {
            display.value = '';
            shouldResetScreen = false;
        }
        display.value += button.textContent;
    });
});

// Add decimal point
decimalButton.addEventListener('click', () => {
    if (shouldResetScreen) {
        display.value = '0.';
        shouldResetScreen = false;
        return;
    }
    if (!display.value.includes('.')) {
        display.value += '.';
    }
});

// Handle operations (+, -, x, /)
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperation !== null) calculate();
        firstNumber = display.value;
        currentOperation = button.textContent;
        shouldResetScreen = true;
    });
});

// Calculate the result
function calculate() {
    if (currentOperation === null || shouldResetScreen) return;
    
    secondNumber = display.value;
    let result = 0;
    
    // Do the math based on the operation
    switch (currentOperation) {
        case '+':
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case '-':
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case '*':
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case '/':
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
    }
    
    display.value = result;
    currentOperation = null;
}

// When equals button is clicked
equalsButton.addEventListener('click', () => {
    calculate();
    shouldResetScreen = true;
});

// Clear everything
clearButton.addEventListener('click', () => {
    display.value = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
});

// Start with 0 on the display
updateDisplay('0');