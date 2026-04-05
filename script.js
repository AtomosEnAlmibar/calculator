const MAX_DIGITS = 8;

const containerElement = document.querySelector(".container");
const resetButton = document.querySelector(".reset-button");
const displayElement = document.querySelector(".display");

let firstNumber = '0';
let secondNumber = '';
let currentOperator;

document.querySelector(".button-container").addEventListener('click', (event) => {
  const button = event.target.closest('.button');
  if (!button) return;

  if (button.classList.contains('digit')) {
    addNumber(button.textContent);
  } else if (button.classList.contains('operator')) {
    addOperator(button.textContent);
  } else if (button.classList.contains('equal')) {
    doOperation();
  } else if (button.classList.contains('reset')) {
    resetOperation(true);
  }
  
});

function addNumber(number) {
  const operatorExists = hasOperator();
  let currentNumber = operatorExists ? secondNumber : firstNumber; 
  
  if (isDecimal(currentNumber) && number == '.') return;
  
  const lengthToCheck = isDecimal(currentNumber) ? MAX_DIGITS + 1 : MAX_DIGITS;

  
  if (currentNumber.length > lengthToCheck) return;

  if (currentNumber === '0' || currentNumber === '') {
    currentNumber = number;
  } else {
    currentNumber += number;
  }

  operatorExists ? (secondNumber = currentNumber) : (firstNumber = currentNumber);

  refreshDisplay(currentNumber);
}

function addOperator(operator) {
  if (firstNumber != '' && secondNumber != '') return;
  
  currentOperator = operator;
}

function doOperation() {
  if (!hasOperator()) return;
  
  switch (currentOperator) {
    case '+':
      firstNumber = Number(firstNumber) + Number(secondNumber);
      break;
    case '−':
      firstNumber = Number(firstNumber) - Number(secondNumber);
      break;
    case '×':
      firstNumber = Number(firstNumber) * Number(secondNumber);
      break;
    case '÷':
      if ((secondNumber == '0' && firstNumber != '0')) {
        firstNumber = 'Tu madre';
      } else {
        firstNumber = Number(firstNumber) / Number(secondNumber);
      }
      break;
  }

  refreshDisplay(firstNumber);
  resetOperation();
}

function refreshDisplay(numberToDisplay) {
  if (numberToDisplay.length > 20) {
    displayElement.textContent = `Number too long`;
    resetOperation();
    return;
  }
  let trimmedNumber = isDecimal(numberToDisplay) ? numberToDisplay.toString().substring(0, MAX_DIGITS + 1) : numberToDisplay;
  displayElement.textContent = `${trimmedNumber}`;
}

function resetOperation(clearDisplay = false) {
  firstNumber = '0';
  secondNumber = '';
  currentOperator = null;

  if (clearDisplay) refreshDisplay(firstNumber);
}

function hasOperator() {
  return !!currentOperator;
}

function isDecimal(number) {
  if (number.toString().includes('.')) return true;
  return false;
}