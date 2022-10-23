import calculateTotals from './calculateTotals.js';

const tbValue = document.querySelector('#tB-value') as HTMLHeadingElement;
const incomeValue = document.querySelector(
	'#income-value'
) as HTMLHeadingElement;
const expenseValue = document.querySelector(
	'#expense-value'
) as HTMLHeadingElement;

const RENDER_Totals = () => {
	const { balance, income, expense } = calculateTotals();

	let newBalance: string;
	let newIncome: string = `+$${income.toLocaleString()}`;
	let newExpense: string = `-$${expense.toLocaleString()}`;

	if (balance < 0) newBalance = `-$${(-(balance)).toLocaleString()}`;
	if (balance >= 0) newBalance = `$${balance.toLocaleString()}`;

	tbValue.innerText = newBalance;
	incomeValue.innerText = newIncome;
	expenseValue.innerText = newExpense;
};

export default RENDER_Totals;
