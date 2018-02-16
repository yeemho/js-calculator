  //define functions to operate on two numbers
  let add = (a,b) => a+b;
  let subtract = (a,b) => a-b;
  let multiply = (a,b) => a*b;
  let divide = (a,b) => a/b;
  
  //function takes operator parameter as string, two number parameters
  function operate (operator, num1, num2) {
    var code = operator.charCodeAt(0); 
    var total;  
    switch (code) { //calls functions on number parameters and saves results into a variable
      case 43:
        total = add(num1,num2);
        break;
      case 45:
        total = subtract(num1,num2);
        break;
      case 42:
        total = multiply(num1,num2);
        break;
      case 47:
        total = divide(num1,num2);
        break;
    }
    return total; // return value is variable containing solution
  }
  
  function calculate() {    
    //getCalcParameters()
    var operator = displayValue.match(/[-*+/]/g); //put minus first otherwise it is read as a hypen
    var numbers = displayValue.match(/\d+\.*\d*/g);  
    var num1;
    var num2;
    var subtotal;
   
    //Multiply and divide take operation precedence  
    while(operator.indexOf('*')!= -1 || operator.indexOf('/') !=-1) {
      for(var i=0; i<operator.length; i++) {
        if(operator[i] == '/' || operator[i] == '*') {
          num1 = numbers[i];
          num2 = numbers[i+1];
          subtotal = operate(operator[i],num1,num2);
          operator.splice(i,1);
          numbers.splice(i,2,subtotal);
        }   
      }
    }  
    //Add and subtract  
    while(operator.indexOf('+')!= -1 || operator.indexOf('-') !=-1) {
      for(var i=0; i<operator.length; i++) {
        if(operator[i] == '+' || operator[i] == '-') {
          num1 = Number(numbers[i]);
          num2 = Number(numbers[i+1]);
          subtotal = operate(operator[i],num1,num2);
          operator.splice(i,1);
          numbers.splice(i,2,subtotal);
        }   
      }
    }     
    const answer = numbers[0];
    if (answer.toString().indexOf('.') == -1) {
      return answer;
    } else {
      return answer.toString().split(".")[1].length > 5 ? answer.toFixed(5) : answer;
    }
    
  }
  
  
  var displayValue='';
  var isInitialInput = true;
  var prevIsNumber = false;
  var prevIsEqual = false;
  var decimalInUse = false;
  var chainCalc = false;
  
  //takes input parameter as a string and updates display
  function updateDisplay(input) {
    const display = document.querySelector('#display');
    
    if(Number.isInteger(Number(input))) { //input is a number
      switch(chainCalc) {
        case true:
          displayValue = input;
          prevIsNumber = true;
          chainCalc = false;
          break;
        case false:
          const lastChar = displayValue.substr(-1);
          if (input == '0' && lastChar == '/') {
            alert('Cannot divide by zero!')
          } else {
            displayValue += input;
            prevIsNumber = true;
          }
          
          break;
      }
    } else if (input == '.') { //input is a decimal
        switch(decimalInUse) {
          case true:
            break;
          case false:
            if ( chainCalc || isInitialInput ) {
              displayValue = `0${input}`;
              decimalInUse = true;
              prevIsNUmber = false;
            } else if(prevIsNumber) {
              displayValue += input;
              decimalInUse = true;
              prevIsNUmber = false;
            }
            break;
        }
    } else { // input is an operator
         switch (chainCalc) {
          case true:
            displayValue = result.textContent + input;
            prevIsNumber = false;
            decimalInUse = false;
            chainCalc = false;
            break;
          case false:
            if(prevIsNumber) {
              displayValue += input;
              prevIsNumber = false;
              decimalInUse = false;
            }
            break;
        }       
     }
     console.log(displayValue);
     display.textContent = displayValue;
  }
   
  function clearDisplay() { 
    document.querySelector('#display').textContent = 0;
    document.querySelector('#result').textContent =0;
    displayValue='';
    isInitialInput = true;
    prevIsNumber = false;
  }
  
  function backSpace() {
    const display = document.querySelector('#display');
    switch (chainCalc) {
      case false:
        if (displayValue.length <= 1) {
          displayValue = '0';
          isInitialInput = true;
        } else {
          displayValue = displayValue.slice(0,-1);
        }
    }
    display.textContent = displayValue;
  }
   
   
  //Event Listeners
  
  const btns = document.querySelectorAll('.math');
  btns.forEach(btn=> btn.addEventListener('click', function() {
    if (displayValue.length <= 20) {
      updateDisplay(btn.value); 
    } else { alert('Exceed max characters')}   
  }));
  
   const btnEqual = document.querySelector('button[name=equal]');
   btnEqual.addEventListener('click', function() {
    if(prevIsNumber) {
      var solution = calculate();
      document.querySelector('#result').textContent = solution;
      chainCalc = true;
    } else { alert('Invalid Entry')}
   })
 

