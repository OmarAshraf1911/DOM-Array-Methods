const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const removeUserBtn = document.getElementById("remove-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000),
  };

  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// UpdateDOM
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<storage>${item.name}</storage> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Function to remove the last index from data array
function removeLastData() {
  if (data.length > 0) {
    data.pop();
    updateDOM();
  } else {
    alert("Data array is empty. No element to remove.");
  }
}

// Function to double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Function to sort money
function sortMoney() {
  data.sort((a, b) => (b.money - a.money) * 2);
  updateDOM();
}

// Function to filter millionaires
function filterMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// Function to total wealth
function totalWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
removeUserBtn.addEventListener("click", removeLastData);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortMoney);
showMillionairesBtn.addEventListener("click", filterMillionaires);
calculateWealthBtn.addEventListener("click", totalWealth);
