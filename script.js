const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "book", amount: -10 },
//   { id: 4, text: "camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// add transaction
const addTransction(e) => {
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Por favor adicione um texto e um valor");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: parseInt(amount.value),
    };

    transactions.push(transaction);
    addTrasactionDOM(transaction);

    updateValues();

    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }

  e.preventDefault();
}

// generate random ID
const generateID = () => {
  return Math.floor(Math.random() * 10000000);
}

// add transactions to DOM list
const addTrasactionDOM(transaction) => {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>
  `;
  list.appendChild(item);
}

// update the valance,income and expense
const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts
    .reduce((acc, item) => {
      return acc + item;
    }, 0)
    .toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `R$${total}`;
  money_plus.innerText = `R$${income}`;
  money_minus.innerText = `R$${expense}`;
}

// remove transaction by Id
const removeTransaction = (id) => {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// update local storage transactions
const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// init app
const  init = () => {
  list.innerHTML = "";
  transactions.forEach(addTrasactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransction);
