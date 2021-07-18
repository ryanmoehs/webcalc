const calculator = {
  displayNumber: '0',
  // dikasih null karena nunggu user beraksi memberikan nilai
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

// fungsi update angka pada layar dan menghapus data pada kalkulator
function updateDisplay() {
  document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// fungsi memasukkan angka pada displayNumber
function inputDigit(digit) {
  // fungsi utk mereset ke 0
  if (calculator.displayNumber === '0') {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// define function
function inverseNumber() {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
    calculator.displayNumber = '0';
  } else {
    alert('Operator sudah ditetapkan');
  }
}

// melakukan kalkulasi terhadap nilai - nilai yang terdapat pada objek calculator
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert('Anda belum menetapkan operator');
    return;
  }

  let result = 0;
  if (calculator.operator === '+') {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  calculator.displayNumber = result;
}

// init button function
const buttons = document.querySelectorAll('.button');
for (let button of buttons) {
  button.addEventListener('click', function (event) {
    // mendapatkan objek elemen yang diklik
    const target = event.target;

    // untuk menghapus
    if (target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return;
    }

    // bilangan negatif
    if (target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;
    }

    // sama dengan
    if (target.classList.contains('equal')) {
      performCalculation();
      updateDisplay();
      return;
    }

    // operator
    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
