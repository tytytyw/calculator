let currentNum = "";
let numbers = document.querySelectorAll('.number');
let displayCurrentNum = document.querySelector('.current-num');
let displayPrevNum = document.querySelector('.previous-num');
let acBtn = document.querySelector('.clear');
let delBtn = document.querySelector('.delete');
let funcBtns = document.querySelectorAll('.func');
let equally = document.querySelector('.equally');
let sqrt = document.querySelector('.sqrt');
let pow = document.querySelector('.pow');
let typeFunc;
let preTypeFunc;
let operantX = null;
let operantY = null;
let result;
let isPow = false;
let isMinus = false;


function Result (x,y,type) {
  let dr = 1;
  if (x !== Math.round(x) && y !== Math.round(y)) {
    
    if (y.toString().length > x.toString().length) {
      dr = Math.pow(10, y.toString().length - 2)
    } else {
      dr = Math.pow(10, x.toString().length - 2)
    }
    x = x * dr;
    y = y * dr
  }

  if (type === "+") {
    return (x + y) / dr
  }

  if (type === "-") {
    return (y - x) / dr
  }

  if (type === "*") {
    return y * x / dr / dr
  }

  if (type === "÷") {
    return y / x
  }
}

NumClick = (num) => {
  
  if ((currentNum.indexOf('.') === -1) | (num !== ".")) {
    
    if (isMinus) {

      currentNum+=num;
      displayPrevNum.innerHTML = "";
      displayCurrentNum.innerHTML = "-"+currentNum; 
    } else {

        if (currentNum === '0' && num !== ".") {
          currentNum = ""
        }
      currentNum+=num;
      displayCurrentNum.innerHTML = currentNum;
  }}
}

numbers.forEach(number => {
  number.onclick = (e) => NumClick(e.target.outerText)
})

acBtn.onclick = () => ClearCurrentNum()

delBtn.onclick = () => {
  currentNum = currentNum.substring(0, currentNum.length-1);
  
  if (currentNum === "") {
    currentNum = '0';
  }
  displayCurrentNum.innerHTML = currentNum;
}

ClearCurrentNum = () => {
  currentNum = "";
  NumClick("");
  ClearPrevNum();
  displayPrevNum.innerHTML = "";
  operantY = null;
  operantX = null;
  isMinus = false;
}

ClearPrevNum = () => {
  displayPrevNum.innerHTML = ""
}

funcBtns.forEach(btn => btn.onclick = (e) => {
  if (!isPow) {

      if (operantY == currentNum) {
        operantY = null;
      }

    if (!!operantY | operantY === 0) {
      preTypeFunc = typeFunc;

      if (currentNum !== "") {
        operantX = +currentNum;
        result = Result(operantX,operantY,preTypeFunc);
        displayPrevNum.innerHTML = result + e.target.outerText;
        operantY = result;
      }
      displayPrevNum.innerHTML = operantY + e.target.outerText
      displayCurrentNum.innerHTML = "";
      currentNum = "";
      typeFunc = e.target.outerText;
    } else {
      operantY = +currentNum;

        if (currentNum === "") {
          isMinus = true;
          operantY = +operantY - (+operantY * 2);
      }
      typeFunc = e.target.outerText
      displayPrevNum.innerHTML = operantY + typeFunc;
      displayCurrentNum.innerHTML = "";
      currentNum = "";
    }
  }
})

equally.onclick = () => {
  if (isPow) {
    operantX = +currentNum;
    result = Math.pow(+powY, operantX);
    currentNum = result.toString();
    operantY = result;
    displayCurrentNum.innerHTML = result;
    displayPrevNum.innerHTML = "";
    isPow = false;

  } else {
    
    if (!!operantY || operantY === 0 && currentNum !== "") {

      operantX = +currentNum;
      result = Result(operantX,operantY,typeFunc);
      operantY = result;
      displayPrevNum.innerHTML = ""
      displayCurrentNum.innerHTML = operantY;
      currentNum = "";
    }
  }
}

sqrt.onclick = () => {
  isPow = false;

  if (!isMinus) {
    if (operantY<0) {
      displayCurrentNum.innerHTML = "error";
      setTimeout(ClearCurrentNum, 500);
      isMinus = false;
    } else {
      if (!isPow) {

        if (!!operantY && currentNum === "") {
          result = Math.sqrt(operantY);
          displayCurrentNum.innerHTML = result;
          displayPrevNum.innerHTML = "";
          operantY = result;
        }

        if (!!operantY && currentNum !== "") {
          result = Math.sqrt(+currentNum);
          displayCurrentNum.innerHTML = result;
          displayPrevNum.innerHTML = "";
          currentNum = result.toString();
          operantY = result;
        }

        if (!operantY && currentNum !== "") {
          result = Math.sqrt(+currentNum);
          displayPrevNum.innerHTML = result;
          operantY = result;
          displayCurrentNum.innerHTML = "";
          currentNum = result.toString();
        }
      }
    }
  } else {
      displayCurrentNum.innerHTML = "error";
      setTimeout(ClearCurrentNum, 500)
      isMinus = false;
  }
}

pow.onclick = () => {
  if (!isPow) {
    isPow = true;
    
    if (!!operantY) {
       if (isMinus) {
        powY = 0 - +operantY ;
        isMinus = false;
      } else {
        powY = +operantY;
      }
      displayCurrentNum.innerHTML = "";
      currentNum = "";
      displayPrevNum.innerHTML = powY+"^";
    } else {

      if (isMinus) {
        powY = 0 - +currentNum ;
        isMinus = false;
      } else {
        powY = +currentNum;
      }
      displayPrevNum.innerHTML = powY+"^";
      displayCurrentNum.innerHTML = "";
      currentNum = ""
    }
  }
}