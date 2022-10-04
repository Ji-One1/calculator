function add(a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a*b
}

function divide(a , b){
    return a/b
}

function operate(func, a, b){
    return func(a,b)
}


function updateSmallDisplay(newOperator){
    let oldText = smallDisplay.textContent.split(' ');
    if (oldText[0] == ''){
        oldText[0] = mainDisplay.textContent;
    }
    mainDisplay.textContent = '';
    smallDisplay.textContent = `${oldText[0]} ${newOperator}`;
    count += 1;
    if (count == 1){
        evaluate = true
    }
}

function updateMainDisplay(newValue){
    let currentText = mainDisplay.textContent;
    mainDisplay.textContent = currentText + newValue;
}
function wipeCalculator(){
    evaluate = false;
    count = 0;
    mainDisplay.textContent = '';
    smallDisplay.textContent = '';
}

function backspaceMainWindow(){
    let currentText = mainDisplay.textContent.split('');
    currentText.pop();
    mainDisplay.textContent = currentText.join('');
}



function calculateExpression(){
    let oldText = smallDisplay.textContent.split(' ');
    let a = Number(oldText[0]);
    let b = Number(mainDisplay.textContent);
    let operator = operators[oldText[1]]
    newValue = operate(operator, a, b);
    smallDisplay.textContent = newValue;
    mainDisplay.textContent = '';

    
}



const operators = {'÷': divide, '×': multiply,'-': subtract, '+' :add};
mainDisplay = document.querySelector('.window');
smallDisplay = document.querySelector('.small-window');
let evaluate = false;
let count = 0;


buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {button.addEventListener('click', function(e){
    let keyPressed = e.target.textContent;
    if(evaluate  && operators.hasOwnProperty(keyPressed) && mainDisplay.textContent != ''){
        calculateExpression();
        smallDisplay.textContent += ' ' + keyPressed;
    }
    
    else if (operators.hasOwnProperty(keyPressed)){
        updateSmallDisplay(keyPressed);
    }
    else if(keyPressed == "="){
        calculateExpression();
        evaluate = false;
        count = 0;
    }
    else if(keyPressed =='AC'){
        wipeCalculator()
    }
    else if(keyPressed == '⌫'){
        backspaceMainWindow()
    }
    else{
        updateMainDisplay(keyPressed);
    }
})
    
});