import { returnLocalStorage } from './interfaces/FormFormatter.js';

const getLocalStorage = (): Array<returnLocalStorage> => {
	// return the current history
	return localStorage.getItem('history')
		? JSON.parse(localStorage.getItem('history'))
		: [];
};

export const getTotals = () => {
	return localStorage.getItem('totals')
		? JSON.parse(localStorage.getItem('totals'))
		: { balance: 0, income: 0, expense: 0 };
};

export default getLocalStorage;
