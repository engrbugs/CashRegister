const CURRENCY = {
    'ONE HUNDRED': 100,
    'TWENTY': 20,
    'TEN': 10,
    'FIVE': 5,
    'ONE': 1,
    'QUARTER': 0.25,
    'DIME': 0.1,
    'NICKEL': 0.05,
    'PENNY': 0.01,
}

const STATUS_RESULT = {
    closed: 'CLOSED',
    open: 'OPEN',
    insufficientFunds: 'INSUFFICIENT_FUNDS'
}


function checkCashRegister(price, cash, cid) {
    let output = {status: null, change: []};
    let change = cash - price;
    let totalCID = Math.round(cid.reduce((acc, curr) => acc +=curr[1], 0)*100)/100;

    console.log('CHANGE:', change);
    console.log('CASH IN DRAWER:', cid);
    console.log('TOTAL CASH IN DRAWER:', totalCID);

    if(totalCID === change) {
        output.status = STATUS_RESULT.closed;
        output.change = cid;
        return output;
    }

    if (totalCID < change) {
        output.status = STATUS_RESULT.insufficientFunds;
        return output;
    }

    let changeTemp = change;
    let changeArr = [];
    for (let currency in CURRENCY) {
        while ((changeTemp >= CURRENCY[currency]) && (cid.find(el => el[0]===currency)[1]>0)) {
            changeTemp -= CURRENCY[currency];
            cid.find(el => el[0]===currency)[1]-= CURRENCY[currency];
            changeArr.push(currency)
            changeTemp = Math.round(changeTemp*100)/100;
        }
        
    }
    
    if (changeTemp !== 0) {
        // lack of change.
        output.status = STATUS_RESULT.insufficientFunds;
        return output;
    }

    console.log('CHANGE IN CURRENCY:', changeArr);
    let changeSummary = [];

    changeArr.forEach(c => {
        if (changeSummary.filter(el => el[0] === c).length === 0) {
            let container = [];
            container.push(c, changeArr.filter(el => el===c).length*CURRENCY[c]);
            changeSummary.push(container);
        }
    })

    output.status = STATUS_RESULT.open;
    output.change = changeSummary;

    return output;
}
  
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));