const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const transactionPanel: HTMLElement = document.querySelector(
	".add-transaction-panel"
);

const addBtn = document.querySelector(".add-transaction");
const deleteBtn = document.querySelector(".delete");
const deleteAllBtn = document.querySelector(".delete-all");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");

const styleLight = document.querySelector(".light");
const styleDark = document.querySelector(".dark");

const nameInput: HTMLInputElement = document.querySelector("#name");
const amountInput: HTMLInputElement = document.querySelector("#amount");
const categorySelect: HTMLSelectElement = document.querySelector("#category");

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr: number[] = [0];

const showPanel = () => {
	transactionPanel.style.display = "flex";
};
const hidePanel = () => {
	transactionPanel.style.display = "none";
	clearInputs();
};
const checkForm = () => {
	if (
		nameInput.value !== "" &&
		amountInput.value !== "" &&
		categorySelect.value !== "none"
	) {
		addNewTransaction();
		clearInputs();
	} else {
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
	countMoney(moneyArr);
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

const countMoney = (money: number[]) => {
	const newMoney = money.reduce((a, b) => a + b);
	availableMoney.textContent = `${newMoney}zł`;
};

const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id);
	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[3].innerText
	);
	const indexOffTransaction = moneyArr.indexOf(transactionAmount);

	moneyArr.splice(indexOffTransaction, 1);

	transactionToDelete.classList.contains("income")
		? incomeSection.removeChild(transactionToDelete)
		: expensesSection.removeChild(transactionToDelete);

	countMoney(moneyArr);
};
const deleteAllTransactions = () => {
	incomeSection.innerHTML = "<h3>Przychódz:</h3>";
	expensesSection.innerHTML = "<h3>Wydatki:</h3>";
	availableMoney.textContent = "0zł";
	moneyArr = [0];
};

const changeStyleToLight = () => {
    root.style.setProperty('--first-color', '#F9F9F9')
    root.style.setProperty('--second-color', '#14161f')
    root.style.setProperty('--first-color', 'rgba(0,0,0,.2')
}
const changeStyleToDark = () => {
    root.style.setProperty('--first-color', '#14161f')
    root.style.setProperty('--second-color', '#F9F9F9')
    root.style.setProperty('--first-color', 'rgba(255,255,255,.4')
}

addBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", hidePanel);
saveBtn.addEventListener("click", checkForm);
deleteAllBtn.addEventListener("click", deleteAllTransactions);
styleLight.addEventListener('click', changeStyleToLight)
styleDark.addEventListener('click', changeStyleToDark)
