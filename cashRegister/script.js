let price = 19.50;
let cid = [
["PENNY", 1.01],
["NICKEL", 2.05],
["DIME", 3.1],
["QUARTER", 4.25],
["ONE", 90],
["FIVE", 55],
["TEN", 20],
["TWENTY", 60],
["ONE HUNDRED", 100]
];
const valutaValue = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purBtn = document.getElementById("purchase-btn");

//calculate change
const calculateChange = () => {
cid.reverse()
valutaValue.reverse();

  let changeAmount = cash.value - price;
  let changeArr = [];
  let totalCid = cid.reduce((a, b) => a + b[1], 0);

    if (totalCid === changeAmount || totalCid < 0.01) {
    cid.forEach(([coinName, coinValue]) => {
      if (coinValue > 0) {
        changeArr.push(`${coinName}: \$${coinValue}`);
      }
    });
    changeDue.textContent = `Status: CLOSED ${changeArr.join(" ")}`;
    return;
    }

  if (cash.value < price){
    return alert("Customer does not have enough money to purchase the item")
  }
  
  if (cash.value == price){
    return changeDue.textContent = "No change due - customer paid with exact cash";
  }

  for (let i = 0; i < cid.length; i++){
    let coinName = valutaValue[i][0];
    let coinValue = valutaValue[i][1];
    let coinAvailable = cid[i][1];
    let amountNeeded = 0;

    while (changeAmount >= coinValue && coinAvailable > 0){
      changeAmount -= coinValue;
      changeAmount = Number(changeAmount.toFixed(2));
      coinAvailable -= coinValue;
      coinAvailable = Number(coinAvailable.toFixed(2));
      amountNeeded += coinValue;
      amountNeeded = Number(amountNeeded.toFixed(2));
    }
    cid[i][1] = coinAvailable;

    if (amountNeeded > 0) {
      changeArr.push(`${coinName}: \$${amountNeeded}`);
    }
  }

  if (changeAmount > 0) {
    changeDue.textContent = `Status: INSUFFICIENT_FUNDS`;
  } else {
    changeDue.textContent = `Status: OPEN ${changeArr.join(" ")}`;
  }

  
  cash.value = "";
  cid.reverse()
  valutaValue.reverse();
  console.log(cid)
}

//Check all functions
const allFunctions = (e) => {
  e.preventDefault

  calculateChange();
}

purBtn.addEventListener("click", allFunctions);