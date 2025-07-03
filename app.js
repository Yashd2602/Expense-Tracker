let income = 0;
let expense = 0;
let total = 0;

const credited = document.getElementById("credited");
const debited = document.getElementById("debited");
const transactionHistory = document.getElementById("transaction-history");
const transaction =  document.getElementById("transaction");
let incomeTotal = document.getElementById("income-total");
let finalTally = document.getElementById("final-tally");
let expenseTotal =document.getElementById("expense-total");
const form = document.getElementById("money-form");


let positiveTransactions = JSON.parse(localStorage.getItem("PositivePassBook"))||[];
let negativeTransactions = JSON.parse(localStorage.getItem("NegativePassBook"))||[];
let savingsTotal = Number(localStorage.getItem("SavingsTotal"))||0;
document.addEventListener("DOMContentLoaded",fetchPassBook);
credited.addEventListener("click",amountCredited);
debited.addEventListener("click",amountDebited);

function amountCredited(){

const moneyValue1 = document.getElementById("money-value").value;
let numericMoneyValue = Number(moneyValue1);
const transactionValue= document.getElementById("transaction").value;
  if  (!validateForm(numericMoneyValue,transactionValue)){
        return false;
    }
income +=  numericMoneyValue;
incomeTotal.innerText = "";
incomeTotal.innerText = income;
finalTally.innerHTML = (income-expense);
    savingsTotal += numericMoneyValue;
    localStorage.setItem("SavingsTotal",savingsTotal);

const ul = document.createElement("ul");
ul.classList.add("transaction-history-list");
transactionHistory.appendChild(ul);
const li1 = document.createElement("li");
li1.innerText = transactionValue;
const li2 = document.createElement("li");
li2.innerText = moneyValue1;
const li3 = document.createElement("li");
li3.innerText = "-"
ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
const deleteButton = document.createElement("button");
deleteButton.classList.add("delete-btn");
deleteButton.innerHTML = "<i class='fa-solid fa-minus'></i>"
ul.appendChild(deleteButton);
deleteButton.addEventListener("click", ()=>{
    transactionHistory.removeChild(ul);
fetchPassBook();
//    savingsTotal -= index.income;
//     localStorage.setItem("SavingsTotal",savingsTotal);
});

let creditedPassbookEntries = {
    "income":income,
    "expense": expense,
    "Transaction":transactionValue,
    "Credited":moneyValue1,
    "Debited":0
}
positiveTransactions.push(creditedPassbookEntries);
savePassBook();
fetchPassBook();
form.reset();
}

function amountDebited(){
   
    const moneyValue1 = document.getElementById("money-value").value;
    let numericMoneyValue = Number(moneyValue1);
    const transactionValue = document.getElementById("transaction").value;
     if (!validateForm(numericMoneyValue,transactionValue)){
        return false;
    }
    expense += numericMoneyValue;
    expenseTotal.innerText ="";
    expenseTotal.innerText = expense;
    finalTally.innerHTML = (income-expense);
    savingsTotal -= numericMoneyValue;
    localStorage.setItem("SavingsTotal",savingsTotal);

    const ul = document.createElement("ul");
ul.classList.add("transaction-history-list");
transactionHistory.appendChild(ul);
const li1 = document.createElement("li");
li1.innerText = transactionValue;
const li2 = document.createElement("li");
li2.innerText = "-";
const li3 = document.createElement("li");
li3.innerText = moneyValue1;
ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
const deleteButton = document.createElement("button");
deleteButton.classList.add("delete-btn");
deleteButton.innerHTML = "<i class='fa-solid fa-minus'></i>"
ul.appendChild(deleteButton);
deleteButton.addEventListener("click", ()=>{
    transactionHistory.removeChild(ul);
    fetchPassBook();
    // savingsTotal += index.expense;
    // localStorage.setItem("SavingsTotal",savingsTotal);
});


let debitedPassbookEntries = {
    "income":income,
    "expense": expense,
    "Transaction":transactionValue,
    "Credited":0,
    "Debited":moneyValue1
}
negativeTransactions.push(debitedPassbookEntries);
savePassBook();
    form.reset();
}

function savePassBook(){
localStorage.setItem("PositivePassBook",JSON.stringify(positiveTransactions));
localStorage.setItem("NegativePassBook",JSON.stringify(negativeTransactions));

}
function fetchPassBook() {

    income = 0;
expense = 0;
transactionHistory.innerHTML = "";
finalTally.innerText = Number(savingsTotal);

   positiveTransactions.forEach((value,index)=>{
    income += Number(value.Credited)||0;
    expense += Number(value.Debited)||0;


    const ul = document.createElement("ul");
ul.classList.add("transaction-history-list");
transactionHistory.appendChild(ul);
const li1 = document.createElement("li");
li1.innerText = value.Transaction;
const li2 = document.createElement("li");
li2.innerText = value.Credited;
const li3 = document.createElement("li");
li3.innerText = value.Debited == 0 ? "-" : value.Debited;
ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
   
const deleteButton = document.createElement("button");
deleteButton.classList.add("delete-btn");
deleteButton.innerHTML = "<i class='fa-solid fa-minus'></i>"
ul.appendChild(deleteButton);
deleteButton.addEventListener("click", ()=>{
    transactionHistory.removeChild(ul);
deletePositivePassBook(index);
savePassBook();
fetchPassBook();
})
});    
negativeTransactions.forEach((value,index)=>{ 
    expense += Number(value.Debited)||0;
    income += Number(value.Credited)||0;


    const ul = document.createElement("ul");
ul.classList.add("transaction-history-list");
transactionHistory.appendChild(ul);
const li1 = document.createElement("li");
li1.innerText = value.Transaction;
const li2 = document.createElement("li");
li2.innerText = value.Credited == 0 ? "-" : value.Credited;
const li3 = document.createElement("li");
li3.innerText = value.Debited;
ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);

const deleteButton = document.createElement("button");
deleteButton.classList.add("delete-btn");
deleteButton.innerHTML = "<i class='fa-solid fa-minus'></i>"
ul.appendChild(deleteButton);
deleteButton.addEventListener("click", ()=>{
    transactionHistory.removeChild(ul);
deleteNegativePassBook(index);
savePassBook();
fetchPassBook();
});
})
incomeTotal.innerText = income||0;
expenseTotal.innerText = expense||0;
finalTally.innerText = income - expense||0;}

function deletePositivePassBook(index){
    positiveTransactions.splice(index,1);
    savePassBook();
    console.log("working1");
}
function deleteNegativePassBook(index){
    negativeTransactions.splice(index,1);
    savePassBook();
    console.log("working 2");
}
function validateForm(numericMoneyValue,transactionValue){
    if (isNaN(numericMoneyValue) || numericMoneyValue <= 0 || transactionValue === "") {
        alert("Please enter a valid amount and description.");
        return false;
      }else{
      return true;
}}