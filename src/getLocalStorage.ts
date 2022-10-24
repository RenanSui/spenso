import formFormatter from './interfaces/FormFormatter.js';

const getLocalStorage = (): Array<formFormatter> => {
	// return the current history
	return localStorage.getItem('history')
		? JSON.parse(localStorage.getItem('history'))
		: [];
};

export const getId_LocalStorage = (): string => {
	return localStorage.getItem('currentId')
		? JSON.parse(localStorage.getItem('currentId'))
		: { id: '0' };
}

export const getTotals = () => {
	return localStorage.getItem('totals')
		? JSON.parse(localStorage.getItem('totals'))
		: { balance: 0, income: 0, expense: 0 };
};

export default getLocalStorage;
