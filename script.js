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

  if (button.classList.contains('number')) {
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
  console.log(`Add number. Number pressed: ${number}, first number: ${firstNumber}, second number: ${secondNumber}, current operator ${currentOperator}`);
  const operatorExists = hasOperator();
  let currentNumber = operatorExists ? secondNumber : firstNumber; 
  
  if (currentNumber.length > MAX_DIGITS) return;

  if (currentNumber === '0' || currentNumber === '') {
    currentNumber = number;
  } else {
    currentNumber += number;
  }

  operatorExists ? (secondNumber = currentNumber) : (firstNumber = currentNumber);

  refreshDisplay(currentNumber);
}

function addOperator(operator) {
  console.log(`Add operator. Operator pressed: ${operator}, first number: ${firstNumber}, second number: ${secondNumber}, current operator ${currentOperator}`);
  if (firstNumber != '' && secondNumber != '') return;
  
  currentOperator = operator;
}

function doOperation() {
  console.log(`Operate. First number: ${firstNumber}, second number: ${secondNumber}, current operator ${currentOperator}`);
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
  displayElement.textContent = `${numberToDisplay}`;
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