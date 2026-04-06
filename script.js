const MAX_DIGITS = 8;

const containerElement = document.querySelector(".container");
const resetButton = document.querySelector(".reset-button");
const displayElement = document.querySelector(".display");

let firstNumber = '0';
let secondNumber = '';
let currentOperator;
let lastNumberEdited = 'firstNumber';

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
  } else if (button.classList.contains('backspace')) {
    removeLastCharacter(lastNumberEdited);
  } 
  
});

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      addNumber(event.key);
      break;
    case '+':
    case '÷':
    case '−':
    case '÷':
      addOperator(event.key);
      break;
    case '=':
      doOperation();
      break;
    case 'Backspace':
      removeLastCharacter(lastNumberEdited);
      break;
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

  if (operatorExists) {
    secondNumber = currentNumber;
    lastNumberEdited = 'secondNumber';
  } else { 
    firstNumber = currentNumber;
    lastNumberEdited = 'firstNumber';
  }

  refreshDisplay(currentNumber);
}

function addOperator(operator) {
  if (firstNumber != '' && secondNumber != '') return;
  
  currentOperator = operator;
  lastNumberEdited = 'secondNumber';
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
      if (Number(firstNumber) / Number(secondNumber) == 'Infinity' || Number(firstNumber) / Number(secondNumber) == 'NaN') {
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

function removeLastCharacter(number) {
  let numberToCheck = number == 'firstNumber' ? firstNumber : secondNumber;
  if (numberToCheck.length <= 0) return;
  
  numberToCheck = numberToCheck.toString().substring(0, numberToCheck.toString().length - 1);
  console.log('numero muerto', numberToCheck)
  switch (number) {
    case 'firstNumber':
      firstNumber = numberToCheck;
      break;
    case 'secondNumber':
      secondNumber = numberToCheck;
      break;
  }

  refreshDisplay(numberToCheck);
}

function hasOperator() {
  return !!currentOperator;
}

function isDecimal(number) {
  if (number.toString().includes('.')) return true;
  return false;
}