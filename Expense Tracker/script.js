const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransactions = [
//     {id:1, text:'Flower', amount: -20},
//     {id:2, text:'Salary', amount: 300},
//     {id:3, text:'Book', amount: -10},
//     {id:4, text:'Camera', amount: 150}
// ]
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// Add transaction
function addTransaction(e){
    e.preventDefault()

    if(text.value === '' || amount.value === ''){
        alert('All field required')
    }else{
    const transaction = {
        id: generateID,
        text: text.value,
        amount: +amount.value
    }

    //push the created transaction to the array holding them
    transactions.push(transaction)
    addTransactionDOM(transaction)
    updateLocalStorage()
    updateValues()

    text.value = ''
    amount.value = ''

    }

}

//generate random id
function generateID(){
    return Math.floor(Math.random()*100000000)
}

// craete list item and Add class to the list
function addTransactionDOM(transaction){
    //Get the sign 
    const sign = transaction.amount < 0 ? '-' : '+'

    // create item
    const item = document.createElement('li')

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class='delete-btn' onclick='removeTransaction(${transaction.id})'>x</button>
    `
    list.appendChild(item)
}

//Update total, expenses, income
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount)
    //total
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    //income
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)
    //Expense
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)
    
    balance.innerText = `$${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
}

//Update localstorage transactions
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLocalStorage()
    init()
}

//Init app - this function displays all staff to the view from reading the addTransactionDom
function init(){
    // clear the list
    list.innerHTML = ''
    transactions.forEach(addTransactionDOM)
    updateValues()
}

init()

//Events
form.addEventListener('submit', addTransaction)