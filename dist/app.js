const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const transactionPanel = document.querySelector(".add-transaction-panel");
const addBtn = document.querySelector(".add-transaction");
const deleteBtn = document.querySelector(".delete");
const deleteAllBtn = document.querySelector(".delete-all");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const styleLight = document.querySelector(".light");
const styleDark = document.querySelector(".dark");
const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");
let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];
const showPanel = () => {
    transactionPanel.style.display = "flex";
};
const hidePanel = () => {
    transactionPanel.style.display = "none";
    clearInputs();
};
const checkForm = () => {
    if (nameInput.value !== "" &&
        amountInput.value !== "" &&
        categorySelect.value !== "none") {
        addNewTransaction();
        clearInputs();
    }
    else {
        console.log("dupa");
    }
};
const clearInputs = () => {
    nameInput.value = "";
    amountInput.value = "";
    categorySelect.selectedIndex = 0;
};
const addNewTransaction = () => {
    const newTransaction = document.createElement("div");
    newTransaction.classList.add("transaction");
    newTransaction.setAttribute("id", ID);
    checkCategory(selectedCategory);
    newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}
    Wypłata</p>
    <p class="transaction-amount">${amountInput.value}zł
    <button class="delete" onClick='deleteTransaction(${ID})'><i class="ti ti-letter-x"></i></button>
    </p>`;
    amountInput.value > 0
        ? incomeSection.appendChild(newTransaction) &&
            newTransaction.classList.add("income")
        : expensesSection.appendChild(newTransaction) &&
            newTransaction.classList.add("expense");
    moneyArr.push(parseFloat(amountInput.value));
    hidePanel();
    ID++;
    clearInputs();
};
// select category added in html file
const selectCategory = () => {
    selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};
const checkCategory = transaction => {
    switch (transaction) {
        case "[ + ] Przychód":
            categoryIcon = '<i class="ti ti-cash-banknote"></i>';
            break;
        case "[ - ] Zakupy":
            categoryIcon = '<i class="ti ti-shopping-cart"></i>';
            break;
        case "[ - ] Jedzenie":
            categoryIcon = '<i class="ti ti-letter-x"></i>';
            break;
        case "[ - ] Kino":
            categoryIcon = '<i class="ti ti-pizza"></i>';
            break;
    }
};
addBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", hidePanel);
saveBtn.addEventListener("click", checkForm);
