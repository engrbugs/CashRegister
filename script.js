var denom = [
    { name: 'ONE HUNDRED', val: 100},
    { name: 'TWENTY', val: 20},
    { name: 'TEN', val: 10},
    { name: 'FIVE', val: 5},
    { name: 'ONE', val: 1},
    { name: 'QUARTER', val: 0.25},
    { name: 'DIME', val: 0.1},
    { name: 'NICKEL', val: 0.05},
    { name: 'PENNY', val: 0.01},
]
    

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
    var output = {status: null, change: []};
    var change = cash - price;
    let totalCID = Math.round(cid.reduce((acc, curr) => acc +=curr[1], 0)*100)/100;
    


    // var register = cid.reduce(function(acc, curr) { //d
    //     acc.total +=curr[1];
    //     acc[curr[0]] = curr[1];
    //     return acc;
    // }, {total: 0});

    console.log(cid);
    //console.log(register);
    console.log(totalCID);

    if(totalCID === change) {
        output.status = 'CLOSED';
        output.change = cid;
        return output;
    }

    if (totalCID < change) {
        output.status = 'INSUFFICIENT_FUNDS';
        return output;
    }
    let changeTemp = change;
    let changeArr = [];
    for (let currency in CURRENCY) {
        console.log (`Balance in ${currency}:`, cid.find(el => el[0]===currency));
        while ((changeTemp >= CURRENCY[currency]) && (cid.find(el => el[0]===currency)[1]>0)) {
            changeTemp -= CURRENCY[currency];
            cid.find(el => el[0]===currency)[1]-= CURRENCY[currency];
            console.log (`Balance in ${currency}:`, cid.find(el => el[0]===currency));
            changeArr.push(currency)
            changeTemp = Math.round(changeTemp*100)/100;
            console.log(change, changeTemp, CURRENCY[currency])
        }
    }
    console.log(changeArr);
    let changeSummary = [];

    changeArr.forEach(c => {
        if (changeSummary.filter(el => el[0] === c).length === 0) {
            let container = [];
            container.push(c, changeArr.filter(el => el===c).length*CURRENCY[c]);
            changeSummary.push(container);
        }
    })
    
    console.log(changeSummary);


        


    // var change_arr2 = denom.reduce(function(acc, curr){ //d
    //     var value = 0;
    //     while (register[curr.name > 0 && change >=curr.val]) {
    //         change -=curr.val;
    //         register[curr.name] -= curr.val;
    //         value += curr.val;
    //         change = Math.round(change * 100) /100;
    //     }
    //     if (value>0) {
    //         acc.push( [curr.name, value]);
    //     }
    //     return acc;
    // }, []);


    // if (change_arr2.length<1||change >0) {
    //     output.status = 'INSUFFICIENT_FUNDS';
    //     return output;
    // }


    output.status = 'OPEN';
    output.change = changeSummary;
    return output;
}
  
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
  