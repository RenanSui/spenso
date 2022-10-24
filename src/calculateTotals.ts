import getLocalStorage, { getTotals } from './getLocalStorage.js';

interface IgetTotals {
    balance: number;
    income: number;
    expense: number;
}

const calculateTotals = (): IgetTotals => {
	// state variables
	let incomeVar: number = 0;
	let expenseVar: number = 0;
	let counter: number = 0;

	// history local storage
	let history = getLocalStorage();

	// totals local storage
	let totals = getTotals();

	// loop through history local storage and return values
	history.map(() => {
		const { amountNumber } = history[counter];
		if (history[counter].type === 'Expense') expenseVar += amountNumber;
		if (history[counter].type === 'Income') incomeVar += amountNumber;
		counter++;
	});

	totals.income = incomeVar;
	totals.expense = expenseVar;
	totals.balance = incomeVar - expenseVar;

	// destructure
	const { balance, income, expense } = totals;

	// set calculated totals to localStorage totals
	let totalsCalculated = totals;
	localStorage.setItem('totals', JSON.stringify(totalsCalculated));

	return { balance, income, expense };
};

export default calculateTotals;
